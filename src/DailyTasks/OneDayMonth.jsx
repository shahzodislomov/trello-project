import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OneDayMonth = () => {
	const { day } = useParams();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('tasks'));
		setTasks(data.filter((x) => x.due_date.slice(5, 7) == day));
	}, [day]);

	return (
		<div className='mt-10 px-4 sm:px-8'>
			<div className='max-w-full lg:max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6'>
				<h1 className='text-3xl font-bold mb-6'>{`Tasks for ${day}`}</h1>

				<div className='space-y-4'>
					{tasks.length === 0 ? (
						<p>No tasks available for this day.</p>
					) : (
						tasks.map((task) => (
							<div key={task.id} className='bg-gray-100 p-4 rounded-lg'>
								<h3 className='text-xl font-semibold'>{task.text}</h3>
								<p>{task.description}</p>
								<span className='text-sm text-gray-500'>{`Due: ${task.due_date}`}</span>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default OneDayMonth;
