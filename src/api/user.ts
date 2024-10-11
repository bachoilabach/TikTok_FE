import axiosInstance from '../utils/axios';

const handleLogin = async (username: string, password: string) => {
	try {
		const response = await axiosInstance.post('/api/user/login', {
			username,
			password,
		});
		// Lưu token vào localStorage sau khi đăng nhập thành công
		localStorage.setItem('token', response.data.token);
		return response.data;
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
};

export { handleLogin };
