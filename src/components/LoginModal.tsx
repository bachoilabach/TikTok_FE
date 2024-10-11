import React, { useState, useEffect } from 'react';
import { optionsLogin } from '../json/optionsLogin';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function LoginModal({
	open,
	handleOpen,
}: {
	open: boolean;
	handleOpen: () => void;
}) {
	const [showModal, setShowModal] = useState(open);
	const [clickSignUp, setClickSignUp] = useState<boolean>(false);
	const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
	const [showSignUp, setShowSignUpForm] = useState<boolean>(false);

	useEffect(() => {
		if (open) {
			setShowModal(true);
		} else {
			const timeoutId = setTimeout(() => setShowModal(false), 300);
			return () => clearTimeout(timeoutId);
		}
	}, [open]);

	if (!showModal) return null;

	const handleBackgroundClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			handleOpen();
		}
	};

	const handleClickSignUp = () => {
		setClickSignUp((cur) => !cur);
		if (showLoginForm) {
			setShowLoginForm(!showLoginForm);
		}
	};

	const handleClickOption = () => {
		if (clickSignUp) {
			setShowLoginForm(false)
			setShowSignUpForm(true);
		} else {
			setShowSignUpForm(false)
			setShowLoginForm(true);
		}
	};

	// Lọc optionsLogin dựa trên trạng thái clickSignUp
	const filteredOptionsLogin = clickSignUp
		? optionsLogin.slice(0, 5)
		: optionsLogin;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={handleBackgroundClick}>
			<div
				className={`bg-[#252525] w-full max-w-screen-sm mx-auto p-6 rounded-lg shadow-lg relative transform transition-all duration-100 ${
					open
						? 'animate-jump-in animate-once animate-ease-linear animate-duration-200'
						: 'scale-0 opacity-0'
				}`}>
				<div className="w-full flex flex-row-reverse">
					<button
						className="flex items-center justify-center bg-[#2E2E2E] rounded-full p-2 hover:bg-gray-700 transition duration-300"
						onClick={handleOpen}>
						<svg
							width="1.5em"
							height="1.5em"
							viewBox="0 0 48 48"
							fill="white"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M21.1718 23.9999L10.2931 13.1212C9.90261 12.7307 9.90261 12.0975 10.2931 11.707L11.7074 10.2928C12.0979 9.90228 12.731 9.90228 13.1216 10.2928L24.0002 21.1715L34.8789 10.2928C35.2694 9.90228 35.9026 9.90228 36.2931 10.2928L37.7073 11.707C38.0979 12.0975 38.0979 12.7307 37.7073 13.1212L26.8287 23.9999L37.7073 34.8786C38.0979 35.2691 38.0979 35.9023 37.7073 36.2928L36.2931 37.707C35.9026 38.0975 35.2694 38.0975 34.8789 37.707L24.0002 26.8283L13.1216 37.707C12.731 38.0975 12.0979 38.0975 11.7074 37.707L10.2931 36.2928C9.90261 35.9023 9.90261 35.2691 10.2931 34.8786L21.1718 23.9999Z"></path>
						</svg>
					</button>
				</div>
				<div className="w-full flex flex-col items-center justify-center">
					<h1 className="text-[#EAEAEA] text-4xl font-semibold mb-6">
						{clickSignUp ? 'Sign up for TikTok' : 'Log in to TikTok'}
					</h1>

					{showLoginForm && !clickSignUp ? (
						<LoginForm />
					) : !showLoginForm && showSignUp && clickSignUp ? (
						<SignUpForm />
					) : (
						// Hiển thị danh sách các tùy chọn login
						<div className="w-3/4 flex flex-col space-y-4 max-h-[410px] min-h-[410px] overflow-y-auto scroll-login pr-2">
							{filteredOptionsLogin.map((ele, index) => (
								<span
									className="relative bg-[#363737] px-3 py-3 flex items-center justify-center rounded-md hover:cursor-pointer hover:bg-[#131312] hover:border"
									key={index}
									onClick={
										ele.text === 'Use phone / email / username'
											? handleClickOption
											: undefined
									}>
									<div className="absolute left-5">{ele.icon}</div>
									<p className="text-[#EAEAEA] font-semibold">{ele.text}</p>
								</span>
							))}
						</div>
					)}
				</div>

				{!showLoginForm ? (
					<div className="text-[#929284] px-10 py-4 w-[95%]">
						<p className="text-center leading-normal text-sm">
							By continuing with an account located in{' '}
							<span className="text-[#dededf]">Vietnam</span>, you agree to our{' '}
							<span className="text-[#dededf] hover:underline cursor-pointer">
								Terms of Service
							</span>{' '}
							and acknowledge that you have read our{' '}
							<span className="text-[#dededf] hover:underline cursor-pointer">
								Privacy Policy
							</span>
							.
						</p>
					</div>
				) : (
					''
				)}
				<span className="border-[0.5px] block border-[#929284] w-[540px] -ml-6"></span>
				<p className="text-center mt-5 text-[#dededf] text-lg">
					{!clickSignUp ? 'Don’t have an account? ' : 'Already have an account? '}
					<span
						className="text-[#ff3b5c] hover:cursor-pointer hover:underline"
						onClick={handleClickSignUp}>
						{!clickSignUp ? 'Sign Up' : 'Login'}
					</span>
				</p>
			</div>
		</div>
	);
}
