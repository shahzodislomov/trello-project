import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, changeStatus, deleteTask } from '../Redux/taskSlice';
import { format, addDays, subDays, startOfWeek, isSameDay } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

function WeeklyTasks() {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.weeklyTasks);
	const [newTask, setNewTask] = useState('');
	const [showMenu, setShowMenu] = useState(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });

	const handlePrevWeek = () => {
		setCurrentDate(subDays(currentDate, 7));
	};

	const handleNextWeek = () => {
		setCurrentDate(addDays(currentDate, 7));
	};

	const handleAddTask = () => {
		if (newTask.trim()) {
			dispatch(
				addTask({
					section: 'weeklyTasks',
					task: {
						id: uuidv4(),
						text: newTask,
						status: 'todo',
						date: currentDate.toISOString(),
					},
				})
			);
			setNewTask('');
		}
	};

	const handleChangeStatus = (id, status) => {
		dispatch(changeStatus({ section: 'weeklyTasks', id, status }));
		setShowMenu(null);
	};

	const handleDeleteTask = (id) => {
		dispatch(deleteTask({ section: 'weeklyTasks', id }));
		setShowMenu(null);
	};

	const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
		addDays(startOfWeekDate, i)
	);

	return (
		<div className='p-4 bg-gray-100'>
			<div className='flex justify-between items-center mb-4'>
				<button onClick={handlePrevWeek} className='text-blue-500 p-2'>
					<FaChevronLeft size={20} />
				</button>
				<button onClick={handleNextWeek} className='text-blue-500 p-2'>
					<FaChevronRight size={20} />
				</button>
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-4'>
				{daysOfWeek.map((day, index) => (
					<div
						key={index}
						className={`border p-2 rounded-lg text-center ${
							isSameDay(day, currentDate)
								? 'bg-[#5200FF] text-white'
								: 'bg-white text-gray-600'
						}`}
					>
						{console.log(day)}
						<Link to={`/todo/weekly/${format(day, 'yyyy-MM-dd')}`}>
							<div
								className={`font-semibold ${
									isSameDay(day, currentDate) ? 'text-white' : 'text-gray-600'
								}`}
							>
								{format(day, 'EEEE')}
							</div>
							<div
								className={`text-sm ${
									isSameDay(day, currentDate) ? 'text-white' : 'text-gray-600'
								}`}
							>
								{format(day, 'dd.MM')}
							</div>
						</Link>
					</div>
				))}
			</div>

			<div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 bg-gray-50 rounded-lg shadow-md'>
				{['todo', 'inProgress', 'done'].map((status) => (
					<div
						key={status}
						className='flex-1 bg-white p-4 rounded-lg shadow-md border border-gray-300'
					>
						<div
							className={`text-lg font-bold text-center mb-2 ${
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
						</div>

						<div className='space-y-2'>
							{tasks
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
								<button
									onClick={handleAddTask}
									className='text-blue-500 font-semibold'
								>
									+ add task
								</button>
								<input
									type='text'
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)}
									placeholder='Add a new task'
									className='border-b-2 border-blue-500 outline-none mt-2 w-full p-1 text-gray-700'
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default WeeklyTasks;
