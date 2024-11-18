import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, changeStatus, deleteTask } from "../Redux/taskSlice";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  getDaysInMonth,
  addDays as dateFnsAddDays,
  isSameDay,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

function MonthlyTasks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.monthlyTasks);
  const [newTask, setNewTask] = useState("");
  const [showMenu, setShowMenu] = useState(null);
  const currentDate = new Date();
  const daysOfMonth = [];
  for (let i = 0; i < 12; i++) {
    const day = moment(currentDate).subtract(i, "month");
    daysOfMonth.push({
      dayMonth: day.format("MMMM"),
      query: day.format("MM"),
    });
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(
        addTask({
          section: "monthlyTasks",
          task: {
            id: uuidv4(),
            text: newTask,
            status: "todo",
            date: currentDate.toISOString(),
          },
        })
      );
      setNewTask("");
    }
  };

  const handleChangeStatus = (id, status) => {
    dispatch(changeStatus({ section: "monthlyTasks", id, status }));
    setShowMenu(null);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask({ section: "monthlyTasks", id }));
    setShowMenu(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4"></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {daysOfMonth.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col w-full items-center justify-center px-6 py-4 rounded-lg cursor-pointer bg-white hover:bg-purple-200 transition-all duration-300 ease-in-out shadow-sm"
            onClick={() => navigate(`/todo/monthly/${item.query}`)}
          >
            <span className="text-lg font-medium text-gray-700">
              {item.dayMonth}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg shadow-md">
        {["todo", "inProgress", "done"].map((status) => (
          <div
            key={status}
            className="flex-1 bg-white p-4 rounded-lg shadow-md border border-gray-300 mt-4 sm:mt-0"
          >
            <div
              className={`text-lg font-bold text-center mb-2 ${
                status === "todo"
                  ? "text-blue-500"
                  : status === "inProgress"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              <p>
                {status === "inProgress"
                  ? "In Progress"
                  : status === "done"
                  ? "Done"
                  : "To Do"}
              </p>
            </div>

            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 p-2 rounded-lg flex justify-between items-center bg-gray-50 relative"
                  >
                    <span className="font-medium text-gray-700">
                      {task.text}
                    </span>
                    <button
                      onClick={() => setShowMenu(task.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      &#8942;
                    </button>

                    {showMenu === task.id && (
                      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 right-0 mt-2 z-10">
                        {status !== "inProgress" && (
                          <button
                            onClick={() =>
                              handleChangeStatus(task.id, "inProgress")
                            }
                            className="block text-left px-4 py-2 w-full hover:bg-gray-100 text-yellow-500 font-semibold"
                          >
                            In Progress
                          </button>
                        )}
                        {status !== "done" && (
                          <button
                            onClick={() => handleChangeStatus(task.id, "done")}
                            className="block text-left px-4 py-2 w-full hover:bg-gray-100 text-green-500 font-semibold"
                          >
                            Done
                          </button>
                        )}
                        {status !== "todo" && (
                          <button
                            onClick={() => handleChangeStatus(task.id, "todo")}
                            className="block text-left px-4 py-2 w-full hover:bg-gray-100 text-orange-700 font-semibold"
                          >
                            todo
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="block text-left px-4 py-2 w-full hover:bg-gray-100 text-red-500 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {status === "todo" && (
              <div className="mt-4">
                <button
                  onClick={handleAddTask}
                  className="text-blue-500 font-semibold"
                >
                  + add task
                </button>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task"
                  className="border-b-2 border-blue-500 outline-none mt-2 w-full p-1 text-gray-700"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyTasks;
