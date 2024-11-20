import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OneDaySpecial = () => {
	const { day } = useParams();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('tasks'));
		setTasks(data.filter((x) => x.due_date == day));
	}, [day]);

	const deleteTask = (task) => {
		const all = JSON.parse(localStorage.getItem('tasks'));
		const filter = all.filter((x) => x.id !== task.id);
		localStorage.removeItem('tasks');
		localStorage.setItem('tasks', JSON.stringify([...filter]));
		window.location.reload();
	};

	return (
		<div className='mt-10 px-4 sm:px-8'>
			<div className='max-w-full lg:max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6'>
				<h1 className='text-3xl font-bold mb-6'>{`Tasks for ${day}`}</h1>

				<div className='space-y-4'>
					{tasks.length === 0 ? (
						<p>No tasks available for this day.</p>
					) : (
						tasks.map((task) => (
							<div key={task.id} className='bg-gray-100 p-4 rounded-lg flex flex-col'>
								<h3 className='text-xl font-semibold'>{task.text}</h3>
								<p>{task.description}</p>
								<span className='text-sm text-gray-500'>{`Due: ${task.due_date}`}</span>
								<button
									onClick={() => deleteTask(task)}
									className='self-end bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600'
								>
									Delete
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default OneDaySpecial;
