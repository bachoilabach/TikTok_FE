import axiosInstance from '../utils/axios';

const handleGetCommentsApi = async (videoId: string, commentParentId: string | null) => {
	try {
		let response;
        response = await axiosInstance.get(`/api/comment/get-comment-by-id?videoId=${videoId}`)
		if (commentParentId !== null) {
			response = await axiosInstance.get(
				`/api/comment/get-comment-by-id?videoId=${videoId}&commentParentId=${commentParentId}`
			);
		}
        return response.data
	} catch (error) {
		console.log(error);
	}
};

export {handleGetCommentsApi}