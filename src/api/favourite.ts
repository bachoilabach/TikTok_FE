import axiosInstance from "../utils/axios"

const handleCreateFavouriteVideo = async(videoId: string) =>{
    try {
        const response = await axiosInstance.post(`/api/favourite/create-favourite/${videoId}`,)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const handleDeleteFavouriteVideo = async(videoId: string) =>{
    try {
        const response = await axiosInstance.delete(`/api/favourite/delete-favourite/${videoId}`,)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const handleGetVideoLikedByUserId = async() => {
    try {
        const response = await axiosInstance.get('/api/favourite/get-video-liked')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {handleCreateFavouriteVideo,handleDeleteFavouriteVideo,handleGetVideoLikedByUserId}