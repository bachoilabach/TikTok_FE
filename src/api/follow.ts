import axiosInstance from "../utils/axios"

const handleGetAllFollowApi = async() =>{
    const response = await axiosInstance.get('/api/follow/get-all-follow')
    return response.data
}

const handleFollowApi =  async(followingId: string) =>{
    const response = await axiosInstance.post(`/api/follow/create-follow/${followingId}`)
    return response.data
}

export {handleFollowApi,handleGetAllFollowApi}