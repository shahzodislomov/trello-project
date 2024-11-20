import React, { useEffect, useState } from "react";
import {
  format,
  addDays,
  subDays,
  isSameDay,
  startOfMonth,
  addMonths,
  parse,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

function OneDayMonth() {
  const { day } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newTask, setNewTask] = useState("");
  const [showMenu, setShowMenu] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = data.filter(
      (task) => task.due_date.slice(5, 7) === day
    );
    setTasks(filteredTasks);
  }, [day]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      due_date: day,
      status: "todo",
    };

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...allTasks, newTaskObj]));
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleChangeStatus = (id, newStatus) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setShowMenu(null);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subDays(currentDate, 30));
  };

  const handleNextMonth = () => {
    setCurrentDate(addDays(currentDate, 30));
  };

  const daysOfMonth = Array.from({ length: 12 }, (_, i) => {
    const date = addMonths(startOfMonth(currentDate), i);
    return {
      dayMonth: format(date, "MMMM"),
      query: format(date, "yyyy-MM"),
    };
  });

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-blue-500 p-2">
          <FaChevronLeft size={20} />
        </button>
        <button onClick={handleNextMonth} className="text-blue-500 p-2">
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
        {daysOfMonth.map((date, index) => (
          <div
            key={index}
            className={`border p-2 rounded-lg text-center ${
              day === date.query
                ? "bg-[#5200FF] text-white"
                : "bg-white text-gray-600"
            }`}
          >
            <Link to={`/todo/monthly/${date.query.slice(5)}`}>
              <div className="font-semibold">{date.dayMonth}</div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 bg-gray-50 rounded-lg shadow-md">
        {["todo", "inProgress", "done"].map((status) => (
          <div
            key={status}
            className="flex-1 bg-white p-4 rounded-lg shadow-md border border-gray-300"
          >
            <h3
              className={`text-lg font-bold text-center mb-2 ${
                status === "todo"
                  ? "text-blue-500"
                  : status === "inProgress"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {status === "inProgress"
                ? "In Progress"
                : status === "done"
                ? "Done"
                : "To Do"}
            </h3>

            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 p-2 rounded-lg bg-gray-50 flex justify-between items-center relative"
                  >
                    <span>{task.text}</span>
                    <button
                      onClick={() => setShowMenu(task.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      &#8942;
                    </button>
                    {showMenu === task.id && (
                      <div className="absolute bg-white border rounded-lg shadow-lg p-2 right-0 mt-2 z-10">
                        {task.status !== "todo" && (
                          <button
                            onClick={() => handleChangeStatus(task.id, "todo")}
                            className="block w-full text-blue-700 font-semibold hover:bg-gray-100 px-4 py-2"
                          >
                            To Do
                          </button>
                        )}
                        {task.status !== "inProgress" && (
                          <button
                            onClick={() =>
                              handleChangeStatus(task.id, "inProgress")
                            }
                            className="block w-full text-orange-500 font-semibold hover:bg-gray-100 px-4 py-2"
                          >
                            In Progress
                          </button>
                        )}
                        {task.status !== "done" && (
                          <button
                            onClick={() => handleChangeStatus(task.id, "done")}
                            className="block w-full text-green-500 font-semibold hover:bg-gray-100 px-4 py-2"
                          >
                            Done
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="block w-full text-red-500 font-semibold hover:bg-gray-100 px-4 py-2"
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
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a task"
                  className="border p-2 rounded-lg w-full"
                />
                <button
                  onClick={handleAddTask}
                  className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                >
                  Add Task
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OneDayMonth;
