import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Api from '../assets/API';

const OtpAuth = () => {
	const navigate = useNavigate();
	const [otp, setOtp] = useState('');
	const email = useSelector((state) => state.user.email);
	const [message, setMessage] = useState('');

	const handleVerifyOtp = async () => {
		try {
			console.log({ email, otp });

			const response = await axios.post(
				`${Api}/api/auth/verify-otp/`,
				{
					email,
					otp_code: otp,
				}
			);
			localStorage.setItem('token', response.data.access_token);

			setMessage(response.data.message);

			if (
				response.status === 200 &&
				response.data.message === 'OTP verified successfully'
			) {
				navigate('/todo/today');
			} else {
				setMessage('OTP verification failed. Please try again.');
			}
		} catch (error) {
			console.error(error.response?.data?.message || 'Error verifying OTP');
			setMessage(error.response?.data?.message || 'Error verifying OTP');
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen p-4 bg-gray-50'>
			<div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold text-center mb-6 text-gray-700'>
					Verify Code
				</h2>
				<div className='mb-6'>
					<label
						className='block text-sm font-medium text-gray-600 mb-2'
						htmlFor='auth-code'
					>
						Enter the Code
					</label>
					<input
						id='code'
						type='text'
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						placeholder='Enter auth code'
						className='w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>
				<button
					onClick={handleVerifyOtp}
					className='w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
				>
					Verify OTP
				</button>
				{message && <p className='mt-4 text-red-500'>{message}</p>}
			</div>
		</div>
	);
};

export default OtpAuth;
