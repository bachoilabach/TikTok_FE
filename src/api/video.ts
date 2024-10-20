import axiosInstance, { socket } from '../utils/axios';

const handleGetAllVideoApi = async () => {
	try {
		const response = await axiosInstance.get('/api/video/get-all-video');
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const handleUploadVideoToCloudApi = async (video: File) => {
	try {
		const formData = new FormData();
		formData.append('video', video);
		const socketId = socket.id;
		if (socketId) {
			formData.append('socketId', socketId); // Thêm socketId nếu tồn tại
		} else {
			throw new Error(
				'Socket ID is undefined. Unable to track upload progress.'
			);
		}

		// Gửi video lên server
		const response = await axiosInstance.post('/api/video/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error uploading video:', error);
		throw error;
	}
};

export { handleGetAllVideoApi, handleUploadVideoToCloudApi };
