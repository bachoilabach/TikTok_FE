import axiosInstance from '../utils/axios';

const handleGetAllVideoApi = async () => {
	try {
		const response = await axiosInstance.get('/api/video');
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export { handleGetAllVideoApi };
