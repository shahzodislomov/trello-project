import React, { useEffect, useState } from 'react';

function AddSpecialDay({ onClose, onAddTask }) {
	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem('tasks')) || []
	);
	const [special, setSpecial] = useState([]);
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');
	const [task, setTask] = useState('');
	const months = [
		{ key: '01', value: 'January' },
		{ key: '02', value: 'February' },
		{ key: '03', value: 'March' },
		{ key: '04', value: 'April' },
		{ key: '05', value: 'May' },
		{ key: '06', value: 'June' },
		{ key: '07', value: 'July' },
		{ key: '08', value: 'August' },
		{ key: '09', value: 'September' },
		{ key: '10', value: 'October' },
		{ key: '11', value: 'November' },
		{ key: '12', value: 'December' },
	];

	useEffect(() => {
		const savedSpecial = JSON.parse(localStorage.getItem('special')) || [];
		setSpecial(savedSpecial);
	}, []);

	const daysInMonth = month
		? Array.from(
				{ length: new Date(2024, parseInt(month, 10), 0).getDate() },
				(_, i) => i + 1
		  )
		: [];

	const handleSubmit = () => {
		if (!month || !day || !task.trim()) {
			alert('Please fill all the fields.');
			return;
		}

		const newSpecial = { date: `2024-${month}-${day}`, task };
		const updatedSpecial = [...special, newSpecial];
		setSpecial(updatedSpecial);
		localStorage.setItem('special', JSON.stringify(updatedSpecial));

		const newTaskObj = {
			id: Date.now(),
			text: task,
			status: 'todo',
			due_date: `2024-${month}-${day}`,
		};

		const updatedTasks = [...tasks, newTaskObj];
		setTasks(updatedTasks);
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));

		onAddTask(newTaskObj);
		onClose();
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg relative animate-fade-in'>
				<h2 className='text-2xl font-bold text-center mb-6'>Add Special Day</h2>

				<div className='flex space-x-4 mb-4'>
					<select
						value={month}
						onChange={(e) => setMonth(e.target.value)}
						className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						<option value=''>Select Month</option>
						{months.map((month) => (
							<option key={month.key} value={month.key}>
								{month.value}
							</option>
						))}
					</select>

					<select
						value={day}
						onChange={(e) => setDay(e.target.value)}
						className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
						disabled={!month}
					>
						<option value=''>Select Day</option>
						{daysInMonth.map((day) => (
							<option key={day} value={day}>
								{day}
							</option>
						))}
					</select>
				</div>

				<input
					type='text'
					placeholder='Enter Task'
					value={task}
					onChange={(e) => setTask(e.target.value)}
					className='border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<button
					onClick={handleSubmit}
					className='bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-300'
				>
					Add Task
				</button>

				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl'
				>
					&times;
				</button>
			</div>
		</div>
	);
}

export default AddSpecialDay;
