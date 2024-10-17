import { useEffect, useRef, useState } from 'react';
import Video, { VideoProps } from '../components/Video';
import { handleGetAllVideoApi } from '../api/video'

function ForYou() {
	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Để lưu trữ các tham chiếu video
	const [listVideo,setListVideo] = useState<VideoProps[]>([])

	const handleGetVideos = async() => {
		const response = await handleGetAllVideoApi()
		setListVideo(response.metadata)
	}

	useEffect(()=>{
		handleGetVideos()
	},[])

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
					key={video.videoID}
					style={{ height: 'calc(100vh - 98px)' }} // Điều chỉnh theo chiều cao khung nhìn
					className="w-full snap-start flex-1">
					<Video
						ref={(el) => {
							videoRefs.current[index] = el;
						}}
						videoID={video.videoID}
						userID={video.userID}
						title={video.title}
						videoUrl={video.videoUrl}
						duration={video.duration}
						view={video.view}
						comments={video.comments}
						likes={video.likes}
					/>
				</div>
			))}
		</div>
	);
}

export default ForYou;
