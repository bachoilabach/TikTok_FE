import { toast } from 'react-toastify';
import { createVideoApi } from '../api/video';
import { CreateVideo } from './UploadVIdeo';
import { useNavigate } from 'react-router-dom';

interface ActionButtonsProps {
	videoData: CreateVideo | null; // Nhận videoData từ UploadVideo
}

export default function ActionButtons({ videoData }: ActionButtonsProps) {
	const navigate = useNavigate()
	const handlePost = async () => {
		if (videoData) {
			try {
				const response = await createVideoApi(videoData);
				if (response.status === 201) {
					toast.success(response.message);
					navigate('/')
				}
			} catch (error) {
				console.error(error);
			}
			console.log('Posting video data:', videoData);
		}
	};

	return (
		<div className="flex space-x-6">
			<button
				className={`bg-[#FE2C55] hover:bg-[#d42247] text-lg font-semibold text-white px-4 py-3 rounded-md ${
					!videoData ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				onClick={handlePost}
				disabled={!videoData} // Vô hiệu hóa nếu không có videoData
			>
				<div className="w-28">Post</div>
			</button>
			<button className="bg-[#0000001f] hover:bg-[#0000003d] font-semibold text-lg px-4 text-black rounded-md">
				<div className="w-28">Save draft</div>
			</button>
			<button className="bg-[#0000001f] hover:bg-[#0000003d] font-semibold text-lg px-4 text-black rounded-md">
				<div className="w-28">Discard</div>
			</button>
		</div>
	);
}
