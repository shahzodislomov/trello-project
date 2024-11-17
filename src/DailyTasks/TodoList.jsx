import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeStatus, editTask, deleteTask } from "../Redux/taskSlice";

function TodoList({ section, tasks, onAddTask }) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null); 

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
      setIsAdding(false);
    }
  };

  const handleMoveTask = (index, to) => {
    dispatch(changeStatus({ section, from: "todo", to, index }));
    setMenuOpen(null); 
  };

  const handleEditTask = (index, task) => {
    const updatedTask = prompt("Edit task:", task);
    if (updatedTask && updatedTask.trim()) {
      dispatch(editTask({ section, index, updatedTask }));
    }
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask({ section, index }));
  };

  return (
    <div className="border border-indigo-700 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Todo</h3>
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setMenuOpen(menuOpen === null ? -1 : null)}
        />
      </div>
      {Array.isArray(tasks) &&
        tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-2 relative"
          >
            <span>{task}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleEditTask(index, task)}>Edit</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
              <FaEllipsisV
                className="cursor-pointer"
                onClick={() => setMenuOpen(menuOpen === index ? null : index)}
              />
            </div>
            {menuOpen === index && (
              <div className="absolute bg-white shadow-lg rounded p-2 right-0">
                <button onClick={() => handleMoveTask(index, "inProcess")}>
                  In Process
                </button>
                <button onClick={() => handleMoveTask(index, "done")}>
                  Done
                </button>
              </div>
            )}
          </div>
        ))}

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      )}
      {isAdding && (
        <div className="mt-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
            placeholder="New task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
