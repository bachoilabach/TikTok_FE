import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { handleLogin } from '../api/user';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function LoginForm() {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { login } = useUser();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await handleLogin(username, password);
			const user = response.metadata.user;
			login(user);
			toast.success('Log in successfully')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				const status = error.response.status;
				console.error('Login failed with status:', status);
				if (status === 400) {
					toast.error(error.response.data.message + '. You need to sign up');
				}
				if (status === 401) {
					toast.error('Invalid username or password');
				}
			} else {
				
				console.error('An unexpected error occurred:', error);
			}
		}
	};

	const isFormValid = username.length > 0 && password.length > 0;

	return (
		<form className="w-3/4 flex flex-col min-h-[489px]" onSubmit={handleSubmit}>
			<label className="text-[#EAEAEA] text-xl mb-2" htmlFor="username">
				Email or username
			</label>
			<input
				type="text"
				placeholder="Email or username"
				id="username"
				value={username}
				onChange={handleUsernameChange}
				className="bg-[#363737] px-3 py-3 rounded-sm text-[#EAEAEA] mb-3 focus:outline-none"
			/>

			<div className="relative mb-3">
				<input
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
					className="bg-[#363737] px-3 py-3 rounded-sm text-[#EAEAEA] w-full focus:outline-none"
				/>
				<span
					onClick={togglePasswordVisibility}
					className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
					{showPassword ? (
						<svg
							fill="rgb(255 255 255 / 90%)"
							viewBox="0 0 48 48"
							xmlns="http://www.w3.org/2000/svg"
							width="1.5em"
							height="1.5em">
							<path d="M41.4 23.71a.9.9 0 0 1 0 .58c-.63 1.92-2.2 4.89-4.82 7.51A17.35 17.35 0 0 1 24 37.11c-5.42 0-9.55-2.28-12.58-5.3a20.44 20.44 0 0 1-4.82-7.52.9.9 0 0 1 0-.58c.63-1.92 2.2-4.89 4.82-7.51A17.35 17.35 0 0 1 24 10.89c5.42 0 9.55 2.28 12.58 5.3a20.44 20.44 0 0 1 4.82 7.52ZM24 41c13.83 0 20.82-11.7 21.96-16.81a.85.85 0 0 0 0-.38C44.82 18.71 37.83 7 24 7S3.18 18.7 2.04 23.81a.85.85 0 0 0 0 .38C3.18 29.29 10.17 41 24 41Z"></path>
							<path d="M24 27.21a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42Zm0 4.29a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"></path>
						</svg>
					) : (
						<svg
							fill="rgb(255 255 255 / 90%)"
							viewBox="0 0 48 48"
							xmlns="http://www.w3.org/2000/svg"
							width="1.5em"
							height="1.5em">
							<path d="M38.88 41.7a1 1 0 0 0 1.41 0l1.42-1.4a1 1 0 0 0 0-1.42l-3.86-3.86a24.57 24.57 0 0 0 6.27-9.69 1 1 0 0 0 0-.66C41 15.8 32.66 9 23 9c-3.27 0-6.35.73-9.12 2.05L9.12 6.29a1 1 0 0 0-1.41 0L6.29 7.71a1 1 0 0 0 0 1.41l32.59 32.59Zm-22-27.66A17.8 17.8 0 0 1 23 13c12.75 0 17 12 17 12s-1.38 3.9-4.93 7.25l-4.54-4.55A7.99 7.99 0 0 0 23 17c-.95 0-1.86.16-2.7.47l-3.43-3.43ZM1.87 24.67a24.64 24.64 0 0 1 5.8-9.23l2.77 2.78C7.25 21.46 6 25 6 25s4.25 12 17 12a18 18 0 0 0 5.42-.8l3.05 3.05A21.2 21.2 0 0 1 23 41c-9.83 0-17.93-6.63-21.13-15.67a1 1 0 0 1 0-.66Z"></path>
							<path d="M15 25c0-.68.08-1.35.24-1.98l9.74 9.73A8.02 8.02 0 0 1 15 25Z"></path>
						</svg>
					)}
				</span>
			</div>

			<p className="text-[#EAEAEA] mb-4 text-sm">Forgot password?</p>
			<button
				type="submit"
				className={`text-white py-3 px-4 rounded-md transition duration-300 font-semibold flex items-center justify-center ${
					isFormValid
						? 'bg-[#ff3b5c] hover:bg-[#e0354f]'
						: 'opacity-50 cursor-not-allowed bg-[#363737]'
				}`}
				disabled={!isFormValid} // Disable khi đang loading
			>
				Log in
			</button>
		</form>
	);
}
