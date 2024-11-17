import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import target from '../assets/target.png';
import userIcon from '../assets/people.png';
import TodayTasks from '../DailyTasks/TodayTasks';
import WeeklyTasks from '../DailyTasks/WeeklyTasks';
import MonthlyTasks from '../DailyTasks/MonthlyTasks';
import AddSpecialDay from '../DailyTasks/AddSpecialDay';
import { useSelector } from 'react-redux';

function TodoPage() {
	const [specialDays, setSpeicalDays] = useState([]);
	const location = useLocation();
	const name = useSelector((state) => state.user.name);
	const email = useSelector((state) => state.user.email);

	const [isSpecialDayModalOpen, setSpecialDayModalOpen] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem('special');
		try {
			if (data) {
				const parsedData = JSON.parse(data);

				setSpeicalDays(parsedData);
			} else {
				setSpeicalDays([]);
			}
		} catch (error) {
			console.error('Failed to parse localStorage data for "special":', error);
			setSpeicalDays([]);
		}
	}, []);

	const openSpecialDayModal = () => setSpecialDayModalOpen(true);
	const closeSpecialDayModal = () => setSpecialDayModalOpen(false);

	return (
		<div className='relative mt-10 px-4 sm:px-8'>
			<div
				className={`border border-[#5200FF] p-4 sm:p-8 max-w-full lg:max-w-7xl mx-auto bg-white shadow-lg rounded-lg ${
					isSpecialDayModalOpen && 'blur-sm'
				}`}
			>
				<div className='flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 pb-4 sm:pb-6 mb-4 sm:mb-6'>
					<div className='flex items-center mb-4 sm:mb-0'>
						<img
							src={target}
							alt='arrow-svg-photo'
							className='w-12 sm:w-16 h-12 sm:h-16'
						/>
						<h1 className='text-3xl sm:text-4xl ml-4 font-bold'>Daily Tasks</h1>
					</div>
					<div className='flex items-center'>
						<img
							src={userIcon}
							alt='user-icon'
							className='w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-300 shadow-md mr-4'
						/>
						<div className='flex flex-col text-center sm:text-left'>
							<span className='text-lg sm:text-2xl font-bold'>{name}</span>
						</div>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row mt-4 sm:mt-8'>
					<div className='lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-300 pb-4 lg:pb-0 pr-0 lg:pr-6 mb-6 lg:mb-0'>
						<h2 className='text-xl sm:text-2xl font-semibold mb-4'>User</h2>
						<div className='flex items-center mb-6'>
							<img
								src={userIcon}
								alt='user-icon'
								className='w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-300 shadow-md mr-4'
							/>
							<div className='flex flex-col'>
								<span className='text-md sm:text-lg font-semibold'>{name}</span>
								<span className='text-xs sm:text-sm text-gray-500'>
									{email}
								</span>
							</div>
						</div>
						<div className='flex flex-col space-y-4'>
							<Link
								to='/todo/today'
								className={`p-3 rounded-lg font-semibold ${
									location.pathname === '/todo/today'
										? 'bg-[#5200FF] text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								Today's Challenges
							</Link>
							<Link
								to='/todo/weekly'
								className={`p-3 rounded-lg font-semibold ${
									location.pathname === '/todo/weekly'
										? 'bg-[#5200FF] text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								Weekly Tasks
							</Link>
							<Link
								to='/todo/monthly'
								className={`p-3 rounded-lg font-semibold ${
									location.pathname === '/todo/monthly'
										? 'bg-[#5200FF] text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								Monthly Tasks
							</Link>
							<button
								onClick={openSpecialDayModal}
								className='animation-pulse p-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700 border-4'
							>
								+ Add Special Day
							</button>
						</div>
					</div>

					<div className='lg:w-3/4 lg:pl-6'>
						<Routes>
							<Route path='today' element={<TodayTasks />} />
							<Route path='weekly' element={<WeeklyTasks />} />
							<Route path='monthly' element={<MonthlyTasks />} />
						</Routes>
					</div>
				</div>
			</div>

			{isSpecialDayModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
					<div className='relative z-50'>
						<AddSpecialDay
							onClose={closeSpecialDayModal}
							onAddTask={(task) => console.log('Special day task added:', task)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default TodoPage;
