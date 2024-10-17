import { faPause, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-tailwind/react';
import {
	ChangeEvent,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import { Link } from 'react-router-dom';
import SideVideo from './SideVideo';

export interface VideoProps {
	videoID: string;
	userID: string;
	title: string;
	videoUrl: string;
	duration: number;
	view: number;
	comments: number;
	likes: number;
	// allowComment: number;
	// whoCanView: number;
	// createdDate: Date;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
	const { videoID, userID, title, videoUrl, comments, likes } = props;
	// * State
	const [play, setPlay] = useState<boolean>(true);
	const [animate, setAnimate] = useState<boolean>(false);
	const [volumn, setVolumn] = useState<number>(80);
	const [previousVolumn, setPreviousVolumn] = useState<number>(80);
	const [showVolumeControl, setShowVolumeControl] = useState<boolean>(false);
	const [contentExpanded, setContentExpended] = useState<boolean>(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const titleRef = useRef<HTMLParagraphElement>(null);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [durationVideo, setDurationVideo] = useState<number>(0);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

	// * Play / Pause
	const handleClickPlay = () => {
		setAnimate(true);
		setPlay((prevPlay) => {
			if (prevPlay) {
				videoRef.current?.pause();
			} else {
				videoRef.current?.play();
			}
			return !prevPlay;
		});
	};

	// * Animate icon play
	const handleAnimationEnd = () => {
		setAnimate(false);
	};

	// * Volumn
	const handleVolumnValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(e.target.value) / 100;
		setVolumn(newVolume * 100);
		if (videoRef.current) {
			videoRef.current.volume = newVolume;
		}
	};

	const handleClickBtnVolumn = () => {
		if (volumn !== 0) {
			setPreviousVolumn(volumn);
			setVolumn(0);
			if (videoRef.current) {
				videoRef.current.volume = 0;
			}
		} else {
			setVolumn(previousVolumn);
			if (videoRef.current) {
				videoRef.current.volume = previousVolumn / 100;
			}
		}
	};

	// * Expand content
	const handleTonggleExpand = () => {
		setContentExpended(!contentExpanded);
	};

	// * Video dimesion
	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDurationVideo(videoRef.current.duration);
		}
	};

	// * Duration
	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTime = Number(e.target.value);
		if (videoRef.current) {
			videoRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	useEffect(() => {
		const titleElement = titleRef.current;
		if (titleElement) {
			// Kiểm tra xem title có bị tràn ra khỏi container hay không
			setIsOverflowing(titleElement.scrollWidth > titleElement.clientWidth);
		}
	}, [title]);

	return (
		<div
			className="flex space-x-4 h-[100%] w-[100%] justify-center pl-28"
			key={videoID}>
			<div
				className={`relative h-[100%] rounded-2xl hover:cursor-pointer group flex flex-col items-center`}
				style={{ width: `${(625 + 365) / 2}px` }}
				onClick={handleClickPlay}>
				<video
					autoPlay
					loop
					ref={videoRef}
					onLoadedMetadata={handleLoadedMetadata}
					onTimeUpdate={handleTimeUpdate}
					className="absolute top-0 w-full h-[100%] object-fill rounded-2xl text-white z-0">
					<source src={videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				{/* Top */}
				<div className="px-3 py-2 w-full items-center justify-between flex opacity-0 group-hover:opacity-100 bg-black/10 z-10">
					<div
						className="flex items-center space-x-4 z-10"
						onMouseEnter={() => setShowVolumeControl(true)}
						onMouseLeave={() => setShowVolumeControl(false)}>
						{volumn !== 0 ? (
							<svg
								width="30"
								height="30"
								viewBox="0 0 48 48"
								fill="#fff"
								xmlns="http://www.w3.org/2000/svg"
								onClick={(e) => {
									e.stopPropagation();
									handleClickBtnVolumn();
								}}>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z"></path>
							</svg>
						) : (
							<svg
								width="30"
								data-e2e=""
								height="30"
								viewBox="0 0 48 48"
								fill="#fff"
								onClick={(e) => {
									e.stopPropagation();
									handleClickBtnVolumn();
								}}
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z"></path>
							</svg>
						)}

						{showVolumeControl && ( // Hiển thị thanh input khi hover vào icon loa
							<div className="bg-black/50 rounded-full h-[30px] w-1/2 items-center">
								<input
									type="range"
									min={0}
									max={100}
									defaultValue={volumn}
									value={volumn}
									onChange={(e) => handleVolumnValueChange(e)}
									className="slider"
									style={{
										background: `linear-gradient(to right, white ${volumn}%, #c4c4c4 ${volumn}%)`,
									}}
									onClick={(e) => e.stopPropagation()}
								/>
							</div>
						)}
					</div>

					<Tooltip
						content="Floating Player"
						className="bg-[#545454eb]"
						placement="bottom-start"
						animate={{
							mount: { scale: 1.3, x: -40, y: 10 },
							unmount: { scale: 0, y: 25 },
						}}>
						<svg
							fill="currentColor"
							fontSize="21"
							viewBox="0 0 48 48"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							onClick={(e) => e.stopPropagation()}
							className="text-white z-10">
							<path d="M19.2 7h9.6c2.03 0 3.3 0 4.27.08.92.08 1.2.2 1.3.25a3 3 0 0 1 1.3 1.3c.05.1.17.38.25 1.3.08.96.08 2.24.08 4.27V20h4v-5.8c0-3.92 0-5.88-.76-7.38a7 7 0 0 0-3.06-3.06C34.68 3 32.72 3 28.8 3h-9.6c-3.92 0-5.88 0-7.38.76a7 7 0 0 0-3.06 3.06C8 8.32 8 10.28 8 14.2v19.6c0 3.92 0 5.88.76 7.38a7 7 0 0 0 3.06 3.06c1.5.76 3.46.76 7.38.76h3.85c-.05-.79-.05-1.75-.05-3v-1h-3.8c-2.03 0-3.3 0-4.27-.08-.92-.08-1.2-.2-1.3-.25a3 3 0 0 1-1.3-1.3c-.05-.1-.17-.38-.25-1.3-.08-.96-.08-2.24-.08-4.27V14.2c0-2.03 0-3.3.08-4.27.08-.92.2-1.2.25-1.3a3 3 0 0 1 1.3-1.3c.1-.05.38-.17 1.3-.25C15.89 7 17.17 7 19.2 7Z"></path>
							<path d="M27.44 26.18c-.44.86-.44 1.98-.44 4.22v9.2c0 2.24 0 3.36.44 4.22a4 4 0 0 0 1.74 1.74c.86.44 1.98.44 4.22.44h4.2c2.24 0 3.36 0 4.22-.44a4 4 0 0 0 1.74-1.74c.44-.86.44-1.98.44-4.22v-9.2c0-2.24 0-3.36-.44-4.22a4 4 0 0 0-1.74-1.74C40.96 24 39.84 24 37.6 24h-4.2c-2.24 0-3.36 0-4.22.44a4 4 0 0 0-1.74 1.74ZM37.6 28c1.19 0 1.84 0 2.3.04h.05v.06c.05.46.05 1.11.05 2.3v9.2c0 1.19 0 1.84-.04 2.3v.05h-.06c-.46.05-1.11.05-2.3.05h-4.2c-1.19 0-1.84 0-2.3-.04h-.05v-.06C31 41.44 31 40.8 31 39.6v-9.2c0-1.19 0-1.84.04-2.3v-.05h.06c.46-.05 1.11-.05 2.3-.05h4.2ZM14.83 10.67a1 1 0 0 0 0 1.42l5.78 5.77-2.29 2.3a.6.6 0 0 0 .33 1.02l7.97 1.29a.82.82 0 0 0 .93-.94l-1.29-7.96a.6.6 0 0 0-1.02-.33l-2.3 2.3-5.77-5.79a1 1 0 0 0-1.42 0l-.92.92Z"></path>
						</svg>
					</Tooltip>
				</div>

				{/* Play / Pause */}
				<div
					className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white ${
						animate ? 'play-icon-animate' : 'hidden'
					}`}
					onAnimationEnd={handleAnimationEnd}>
					{play ? (
						<FontAwesomeIcon icon={faPlayCircle} fontSize={70} />
					) : (
						<FontAwesomeIcon icon={faPause} fontSize={70} />
					)}
				</div>

				{/* Content */}
				<div
					className="px-3 pb-2 absolute bottom-0 text-white w-full"
					onClick={(e) => e.stopPropagation()}>
					<Link to={''} className="font-semibold text-xl hover:underline">
						{userID}
					</Link>
					<div className="relative">
						<p
							ref={titleRef}
							className={`break-words  text-lg font-medium ${
								contentExpanded
									? 'w-full'
									: 'whitespace-nowrap overflow-hidden overflow-ellipsis w-[90%]'
							}`}>
							{title}
						</p>
						{isOverflowing && (
							<span
								aria-disabled
								onClick={(e) => {
									handleTonggleExpand();
									e.stopPropagation();
								}}
								className="absolute top-30 right-0 bottom-0 cursor-pointer text-xl font-semibold">
								{contentExpanded ? 'less' : 'more'}
							</span>
						)}
					</div>
				</div>

				{/* Duration */}
				<div
					className="w-full absolute -bottom-2 px-1.5 mb-[1px]"
					onClick={(e) => e.stopPropagation()}>
					<input
						type="range"
						min={0}
						max={durationVideo}
						value={currentTime}
						onChange={(e) => {
							handleDurationChange(e);
							e.stopPropagation();
						}}
						className="w-full duration rounded-b-2xl hover:cursor-pointer"
						style={{
							background: `linear-gradient(to right, #FE2C55 ${
								(currentTime / durationVideo) * 100
							}%, #ffffffe6 ${(currentTime / durationVideo) * 100}%)`,
						}}
					/>
				</div>
			</div>
			<SideVideo likeQuantity={likes} commentQuantity={comments} />
		</div>
	);
});

export default Video;
