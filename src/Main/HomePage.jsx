import { Link } from "react-router-dom";
import target from "../assets/target.png";

function HomePage() {
  return (
    <div className="border-gray-700 p-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="flex items-center mb-6 sm:mb-0">
          <img
            src={target}
            alt="arrow-svg-photo"
            className="w-[40px] h-[40px]"
          />
          <h1 className="text-2xl sm:text-3xl ml-4 font-bold">Daily Tasks</h1>
        </div>
        <div className="flex ml-auto">
          <Link
            to="/signin"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Sign-in
          </Link>
        </div>
      </div>

      <div className="text-center font-bold">
        <h1 className="mt-12 sm:mt-20 text-4xl sm:text-5xl lg:text-[80px]">
          Daily Tasks
        </h1>

        <p className="mt-6 sm:mt-10 px-4 sm:px-16 lg:px-72 text-lg sm:text-xl lg:text-2xl">
          After a stroke, it can take time to figure out how to do the tasks
          that make up daily life. Here are some tips. Find useful services and
          connect with others living with heart disease or stroke.
        </p>

        <div className="mt-8 sm:mt-10">
          <Link
            to="signup"
            className="bg-black text-white px-8 py-2 rounded hover:bg-gray-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
