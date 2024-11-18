import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, changeStatus, deleteTask } from '../Redux/taskSlice';

function TodayTask() {
	const [newTask, setNewTask] = useState('');
	const [showMenu, setShowMenu] = useState(null);
	const [todayDate, setTodayDate] = useState('');
	const [tasks, setTasks] = useState([]);

	const dispatch = useDispatch();
	useEffect(() => {
		const today = new Date();
		const formattedDate = `Today ${String(today.getMonth() + 1).padStart(
			2,
			'0'
		)}.${String(today.getDate()).padStart(2, '0')}.${today.getFullYear()}`;
		setTodayDate(formattedDate);
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(storedTasks);
	}, []);
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const handleAddTask = () => {
		const dateNow = new Date();
		const year = dateNow.getFullYear();
		const month = dateNow.getMonth() + 1;
		const day = dateNow.getDate();
		const date = `${year}-${month}-${day}`;
		if (newTask.trim()) {
			const newTaskObj = {
				id: Date.now(),
				text: newTask,
				status: 'todo',
				due_date: date,
			};

			const updatedTasks = [...tasks, newTaskObj];
			setTasks(updatedTasks);
			setNewTask('');
			dispatch(addTask({ section: 'todayTasks', task: newTaskObj }));
		}
	};

	const handleChangeStatus = (id, status) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, status } : task
		);
		setTasks(updatedTasks);
		setShowMenu(null);
	};

	const handleDeleteTask = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
		setShowMenu(null);
	};

	return (
		<div className='flex flex-col items-center p-4 bg-gray-100'>
			<div className='bg-[#5200FF] text-white text-2xl font-semibold lg:px-80 md:px-40 sm:px-6 py-3 rounded-lg shadow-lg mb-6 text-center'>
				{todayDate}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl'>
				{['todo', 'inProgress', 'done'].map((status) => (
					<div
						key={status}
						className='border border-gray-300 rounded-lg p-4 w-full bg-white shadow-md flex flex-col'
					>
						<div className='flex justify-between items-center mb-2'>
							<h2
								className={`text-lg font-bold capitalize ${
									status === 'todo'
										? 'text-blue-500'
										: status === 'inProgress'
										? 'text-yellow-500'
										: 'text-green-500'
								}`}
							>
								{status === 'inProgress'
									? 'In Progress'
									: status === 'done'
									? 'Done'
									: 'To Do'}
							</h2>
						</div>

						<div className='flex flex-col space-y-2'>
							{(tasks || [])
								.filter((task) => task.status === status)
								.map((task) => (
									<div
										key={task.id}
										className='border border-gray-200 p-2 rounded-lg flex justify-between items-center bg-gray-50 relative'
									>
										<span className='font-medium text-gray-700'>
											{task.text}
										</span>
										<button
											onClick={() => setShowMenu(task.id)}
											className='text-gray-400 hover:text-gray-600'
										>
											&#8942;
										</button>

										{showMenu === task.id && (
											<div className='absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 right-0 mt-2 z-10'>
												{status !== 'inProgress' && (
													<button
														onClick={() =>
															handleChangeStatus(task.id, 'inProgress')
														}
														className='block text-left px-4 py-2 w-full hover:bg-gray-100 text-yellow-500 font-semibold'
													>
														In Progress
													</button>
												)}
												{status !== 'done' && (
													<button
														onClick={() => handleChangeStatus(task.id, 'done')}
														className='block text-left px-4 py-2 w-full hover:bg-gray-100 text-green-500 font-semibold'
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
													className='block text-left px-4 py-2 w-full hover:bg-gray-100 text-red-500 font-semibold'
												>
													Delete
												</button>
											</div>
										)}
									</div>
								))}
						</div>

						{status === 'todo' && (
							<div className='mt-4'>
								<input
									type='text'
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)}
									placeholder='Add a new task'
									className='border-b-2 border-blue-500 outline-none w-full p-1 text-gray-700'
								/>
								<button
									onClick={handleAddTask}
									className='text-blue-500 font-semibold mt-2'
								>
									+ add task
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default TodayTask;
