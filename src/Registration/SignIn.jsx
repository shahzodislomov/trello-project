import { Link, useNavigate } from 'react-router-dom';
import target from '../assets/target.png';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../Redux/userSlice';
import axios from 'axios';
import Api from '../assets/API';

function SignIn() {
	const dispatch = useDispatch();
	const [passsword, setPassword] = useState('');
	const { email } = useSelector((state) => state.user);
	const inputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleEmailChange = (e) => {
		dispatch(setEmail(e.target.value));
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${Api}/api/auth/signin/`,
				{
					email,
					password: passsword,
				}
			);
			localStorage.setItem('token', res.data.access_token);
			console.log(res);
			navigate('/todo/today');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='border-gray-700 p-4'>
			<div className='flex flex-col sm:flex-row items-center sm:items-start'>
				<div className='flex items-center mb-6 sm:mb-0'>
					<img
						src={target}
						alt='arrow-svg-photo'
						className='w-[40px] h-[40px]'
					/>
					<h1 className='text-2xl sm:text-3xl ml-4 font-bold'>Daily Tasks</h1>
				</div>
				<div className='flex ml-auto'>
					<Link
						to='/signup'
						className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700'
					>
						Sign Up
					</Link>
				</div>
			</div>

			<div className='mt-16 sm:mt-28 border border-gray-300 p-6 sm:p-8 max-w-lg mx-auto'>
				<h2 className='text-xl sm:text-2xl font-semibold'>Sign In</h2>
				<p className='text-sm mb-4 sm:mb-6 mt-2'>
					Welcome back! Please enter your email to sign in.
				</p>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2' htmlFor='email'>
							Your Email
						</label>
						<input
							id='email'
							type='email'
							ref={inputRef}
							value={email}
							onChange={handleEmailChange}
							className='w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-sm font-medium mb-2'
							htmlFor='password'
						>
							Your Password
						</label>
						<input
							id='password'
							type='password'
							value={passsword}
							onChange={handlePasswordChange}
							className='w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>

					<button
						type='submit'
						className='bg-black text-white w-full sm:w-auto px-8 py-2 rounded hover:bg-gray-700'
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
