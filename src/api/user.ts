import axiosInstance from '../utils/axios';

const handleLogin = async (username: string, password: string) => {
	try {
		const response = await axiosInstance.post('/api/user/login', {
			username,
			password,
		});
		const { accessToken, refreshToken } = response.data.metadata.tokens;
		console.log(response.data.metadata.user._id);
		const userId = response.data.metadata.user._id;

		// Lưu accessToken và refreshToken vào localStorage
		localStorage.setItem('x-client-id', userId);
		localStorage.setItem('access-token', accessToken);
		localStorage.setItem('refresh-token', refreshToken);

		return response.data;
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
};

const handleLogoutApi = async () => {
	await axiosInstance.post('/api/user/logout');
};

const handleSignUpApi = async (
	email: string,
	username: string,
	password: string,
	phone: string
) => {
	try {
		const response = await axiosInstance.post('/api/user/signup', {
			email,
			username,
			password,
			phone,
		});

		return response.data
	} catch (err) {
		console.log('Sign up error: ', err);
		throw err
	}
};

export { handleLogin, handleLogoutApi, handleSignUpApi };
