import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [time, setTime] = useState("");

  const updateTime = () => {
    const options = {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat([], options);
    const formattedTime = formatter.format(new Date());

    // remove AM or PM from formattedTime
    const timeParts = formattedTime.split(" ");
    const timeWithoutAMPM = timeParts.slice(0, -1);

    setTime(timeWithoutAMPM);
  };

  useEffect(() => {
    // updateTime();
    const intervalID = setInterval(updateTime, 1000);

    return () => clearInterval(intervalID);
  }, [time]);

  return (
    <header className="bg-white border-b border-slate-200 mb-12">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <ul className="flex items-center gap-6">
          <li>
            <Link to="/" className="text-gray-700 text-lg">
              خانه
            </Link>
          </li>
          <li>
            <Link to="/income" className="text-gray-700 text-lg">
              دریافتی
            </Link>
          </li>
          <li>
            <Link to="/reports" className="text-gray-700 text-lg">
              گزارشات
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="text-gray-700 text-lg">
              تسک ها
            </Link>
          </li>
        </ul>

        <div>
          <span className="text-gray-600 text-lg">{time}</span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
