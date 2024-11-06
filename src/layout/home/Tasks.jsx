import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaRegCircle,
  FaRegTrashAlt,
  FaTasks,
} from "react-icons/fa";
import { MdAddTask } from "react-icons/md";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskUnit, setTaskUnit] = useState("hours");
  const [error, setError] = useState("");

  // load tasks from localStorage when the component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Countdown effect to reduce `timeLeft` for each task every second
  useEffect(() => {
    const countdowns = tasks.map((task) =>
      task.timeLeft > 0 && !task.isChecked
        ? setInterval(() => {
            setTasks((prevTasks) =>
              prevTasks.map((pt) =>
                pt.id === task.id ? { ...pt, timeLeft: pt.timeLeft - 1 } : pt
              )
            );
          }, 1000)
        : null
    );

    // Clear intervals on unmount
    return () => countdowns.forEach((interval) => clearInterval(interval));
  }, [tasks]);

  // Unified function to handle input changes
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Calculate duration in seconds
  const durationInSeconds =
    taskUnit === "days" ? taskDuration * 86400 : taskDuration * 3600;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty title or duration
    if (!taskTitle.trim() || !taskDuration.trim()) {
      setError("لطفا همه فیلد ها را پر کنید!");
      return;
    }

    // Reset error if all fields are filled
    setError("");

    const newTask = {
      id: new Date().toISOString(),
      title: taskTitle,
      desc: taskDesc,
      timeLeft: durationInSeconds,
      isChecked: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]); // append new tasks // Top of the list
    // setTasks((prevTasks) => [...prevTasks, newTask]); // append new tasks // Under the list
    resetFields(); // clear inputs after adding
  };

  // Clear input fields
  const resetFields = () => {
    setTaskTitle("");
    setTaskDesc("");
    setTaskDuration("");
    setTaskUnit("hours");
  };

  const handleRemove = (taskID) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID)); // remove task
  };

  const handleToggleCheck = (taskID) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskID ? { ...task, isChecked: !task.isChecked } : task
      )
    ); // toggle check
  };

  const checkedTasksCount = tasks.filter((task) => task.isChecked).length;
  const unCheckedTasksCount = tasks.filter((task) => !task.isChecked).length;

  return (
    <div className="container mx-auto p-4 md:p-0">
      <div className="grid grid-cols-12 gap-8">
        <div className="md:col-span-6 col-span-full">
          <div className="flex items-center gap-2 col-span-full mb-4">
            <MdAddTask size={30} className="text-sky-500" />
            <h3 className="text-gray-600 font-semibold text-2xl">
              اضافه کردن تسک
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="col-span-4">
            {error && (
              <span className="text-red-500 font-normal my-2 block">
                {error}
              </span>
            )}
            <input
              type="text"
              placeholder="عنوان تسک خود را وارد کنید"
              className="outline-none py-2 px-4 border border-slate-200 w-full rounded h-12 text-gray-800 mb-4"
              value={taskTitle}
              onChange={handleInputChange(setTaskTitle)}
            />
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="مدت زمان تسک خود را وارد کنید (مثال: 15 روز)"
                className="outline-none py-2 px-4 border border-slate-200 w-full rounded h-12 text-gray-800 mb-4"
                value={taskDuration}
                min={1}
                onChange={handleInputChange(setTaskDuration)}
              />
              <select
                className="outline-none bg-white border border-slate-200 rounded h-12 py-2 px-4 w-2/4 mb-4"
                onChange={handleInputChange(setTaskUnit)}
              >
                <option value="hours">ساعت</option>
                <option value="days">روز</option>
              </select>
            </div>

            <textarea
              rows={7}
              placeholder="توضیحات تسک خود را وارد کنید (اختیاری)"
              className="outline-none resize-none py-2 px-4 border border-slate-200 w-full rounded text-gray-800 mb-4"
              value={taskDesc}
              onChange={handleInputChange(setTaskDesc)}
            ></textarea>
            <button
              type="submit"
              className="bg-sky-500 py-2 px-4 rounded text-white hover:bg-sky-400 transition"
            >
              اضافه کردن
            </button>
          </form>
        </div>
        <div className="md:col-span-6 col-span-full">
          <div className="flex items-center justify-between col-span-full mb-4">
            <div className="flex items-center gap-2">
              <FaTasks size={30} className="text-sky-500" />
              <h3 className="text-gray-600 font-semibold text-2xl">تسک ها</h3>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-base text-emerald-500 font-normal">
                {checkedTasksCount} تسک انجام شده
              </span>
              <span className="text-base text-red-500 font-normal">
                {unCheckedTasksCount} تسک انجام نشده
              </span>
            </div>
          </div>
          {/* Tasks List */}

          <div>
            {tasks.length ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white p-4 border border-slate-200 rounded mb-2 ${
                    task.isChecked ? "border border-emerald-500" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <h4
                        className={`text-gray-700 font-normal ${
                          task.isChecked ? "line-through text-opacity-50" : ""
                        }`}
                      >
                        {task.title}
                      </h4>
                      <span
                        className={`text-gray-500 font-normal ${
                          task.isChecked ? "line-through text-opacity-50" : ""
                        }`}
                      >
                        {task.isChecked ? (
                          <p className="text-gray-400 font-normal text-sm">
                            تسک شما انجام شد !
                          </p>
                        ) : (
                          formatTime(task.timeLeft)
                        )}
                      </span>
                      <p
                        className={`text-gray-500 font-normal ${
                          task.isChecked ? "line-through text-opacity-50" : ""
                        }`}
                      >
                        {task.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      {task.isChecked ? (
                        <FaCheckCircle
                          size={25}
                          className="text-emerald-500 cursor-pointer"
                          onClick={() => handleToggleCheck(task.id)}
                        />
                      ) : (
                        <FaRegCircle
                          size={25}
                          className="text-gray-500 cursor-pointer"
                          onClick={() => handleToggleCheck(task.id)}
                        />
                      )}
                      <FaRegTrashAlt
                        size={25}
                        className="text-gray-500 cursor-pointer hover:text-red-500 transition"
                        onClick={() => handleRemove(task.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-normal text-center">
                هیچ تسکی وجود ندارد !
              </p>
            )}
          </div>

          {/* Tasks List */}
        </div>
      </div>
    </div>
  );
}

// Helper function to format seconds to HH:MM:SS

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
};

/* 

console.log(formatTime(3661)); // Output: "1:01:01"
console.log(formatTime(59));    // Output: "0:00:59"
console.log(formatTime(3600));  // Output: "1:00:00"

*/

export default Tasks;
