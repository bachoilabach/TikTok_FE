import axios from 'axios';

export const baseURL = 'http://localhost:3000'
// Tạo instance của axios với cấu hình cơ bản
const axiosInstance = axios.create({
	baseURL: baseURL, // URL gốc của API
	timeout: 10000, // Thời gian chờ (tính bằng ms)
	headers: {
		'Content-Type': 'application/json',
	},
});

// Thêm interceptor để xử lý trước khi gửi request
axiosInstance.interceptors.request.use(
	(config) => {
		// Thêm token vào header nếu có
		const userId = sessionStorage.getItem('x-client-id')
		if(userId){
			config.headers['x-client-id'] = `${userId}`
		}

		const accessToken = localStorage.getItem('access-token');
		if (accessToken) {
			config.headers['authorization'] = `${accessToken}`;
		}

		const refreshToken = localStorage.getItem('refresh-token')
		if(refreshToken){
			config.headers['refresh-token'] = `${refreshToken}`
		}

		return config;
	},
	(error) => {
		// Xử lý lỗi nếu có trong quá trình gửi request
		return Promise.reject(error);
	}
);

// Thêm interceptor để xử lý response từ server
axiosInstance.interceptors.response.use(
	(response) => {
		// Xử lý response nếu cần, ví dụ như kiểm tra mã trạng thái
		return response;
	},
	(error) => {
		// Xử lý lỗi, ví dụ như token hết hạn
		if (error.response?.status === 401) {
			// Ví dụ: Điều hướng người dùng đến trang đăng nhập khi bị 401 Unauthorized
			// window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
