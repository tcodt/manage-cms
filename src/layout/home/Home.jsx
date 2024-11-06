import { IoMdAddCircle } from "react-icons/io";
import DateInfos from "../../components/DateInfos";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container mx-auto p-4 md:p-0">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <DateInfos />
          <Link to="/tasks">
            <div className="bg-white p-4 rounded border border-slate-200 flex items-center justify-center h-full group">
              <IoMdAddCircle
                size={60}
                className="text-gray-400 group-hover:text-opacity-50"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
