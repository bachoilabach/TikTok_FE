import { useEffect, useRef, useState } from 'react';
import Video, { VideoProps } from '../components/Video';
import { handleGetAllVideoApi } from '../api/video';
import { handleGetVideoLikedByUserId } from '../api/favourite';
import { useUser } from '../context/UserContext';

interface VideoLiked {
	videoId: string;
	userId: string;
}

function ForYou() {
	const { user } = useUser();
	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Để lưu trữ các tham chiếu video
	const [listVideo, setListVideo] = useState<VideoProps[]>([]);
	const [videoLiked, setVideoLiked] = useState<VideoLiked[]>([]);
	const [likedVideoIds, setLikedVideoIds] = useState<string[]>([]); // Thêm trạng thái lưu các video đã like

	const handleGetVideoLiked = async () => {
		const response = await handleGetVideoLikedByUserId();
		setVideoLiked(response.metadata);
		const likedIds = response.metadata.map(
			(video: VideoLiked) => video.videoId
		);
		setLikedVideoIds(likedIds);
	};

	const handleGetVideos = async () => {
		const response = await handleGetAllVideoApi();
		setListVideo(response.metadata);
	};
	// Dùng useEffect để xử lý thứ tự gọi API
	const fetchData = async () => {
		await handleGetVideoLiked(); // Lấy danh sách video đã like trước
		await handleGetVideos(); // Sau đó mới lấy tất cả video
	};
	useEffect(() => {
		fetchData()
	}, [user]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const videoElement = entry.target as HTMLVideoElement;
					if (entry.isIntersecting) {
						videoElement.play(); // Phát video khi video vào khung nhìn
					} else {
						videoElement.pause(); // Tạm dừng video khi ra khỏi khung nhìn
					}
				});
			},
			{ threshold: 0.5 } // Độ hiển thị 50% của video trong khung nhìn
		);

		// Gắn observer vào mỗi video
		videoRefs.current.forEach((video) => {
			if (video) {
				observer.observe(video);
			}
		});
		// Cleanup observer khi component unmount
		return () => {
			videoRefs.current.forEach((video) => {
				if (video) {
					observer.unobserve(video);
				}
			});
		};
	}, [listVideo]);

	return (
		<div
			className="w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar space-y-5"
			style={{ scrollSnapType: 'y mandatory', height: 'calc(100vh - 91px)' }} // Tương thích cũ hơn
		>
			{listVideo.map((video, index) => (
				<div
					key={video._id}
					style={{ height: 'calc(100vh - 98px)' }} // Điều chỉnh theo chiều cao khung nhìn
					className="w-full snap-start flex-1">
					<Video
						ref={(el) => {
							videoRefs.current[index] = el;
						}}
						_id={video._id}
						userId={video.userId}
						title={video.title}
						videoUrl={video.videoUrl}
						duration={video.duration}
						view={video.view}
						comments={video.comments}
						likes={video.likes}
						liked={likedVideoIds.includes(video._id)}
					/>
				</div>
			))}
		</div>
	);
}

export default ForYou;
