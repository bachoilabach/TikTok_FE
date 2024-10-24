import { Radio, Switch } from '@material-tailwind/react';
import { ChangeEvent, useEffect, useState } from 'react';
import ActionButtons from './ActionButtons';
import DemoScreen from './DemoScreen';
import { createVideoApi, handleUploadVideoToCloudApi } from '../api/video';
import { socket } from '../utils/axios';
import { toast } from 'react-toastify';

interface UploadVideoProps {
	file: File;
}

export interface CreateVideo {
	title: string;
	videoUrl: string;
	thumbnailUrl: string;
	duration: string;
}

type option = {
	value: string;
};

const options: option[] = [
	{
		value: 'Everyone',
	},
	{
		value: 'Friends',
	},
	{
		value: 'Only you',
	},
];

type radio = {
	value: string;
};

const radios: radio[] = [
	{
		value: 'Now',
	},
	{
		value: 'Schedule',
	},
];
export default function UploadVideo({ file }: UploadVideoProps) {
	// * State video
	const [videoInfo, setVideoInfo] = useState({
		name: '',
		size: 0,
		duration: 0,
	});
	const [src, setSrc] = useState<string>('');
	// * State video content
	const [valueTitle, setValueTitle] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState('Everyone');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [videoData, setVideoData] = useState<CreateVideo | null>(null);

	const handleSelect = (option: string) => {
		setSelectedOption(option);
		setIsDropdownOpen(false); // Ẩn danh sách khi đã chọn
	};

	const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValueTitle(e.target.value);
	};

	const uploadVideoToCloud = async () => {
		try {
			const response = await handleUploadVideoToCloudApi(file);
			const newVideoData: CreateVideo = {
				title: valueTitle,
				videoUrl: response.metadata.url,
				thumbnailUrl: response.metadata.thumbnailUrl,
				duration: response.metadata.duration,
			};
			setVideoData(newVideoData);
			toast.success('Upload Video to cloud success');
		} catch (error) {
			console.error('Upload failed:', error);
		}
	};

	useEffect(() => {
		// Kiểm tra nếu file tồn tại
		if (!file) return;

		// Lấy tên và dung lượng file
		const fileName = file.name;
		const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB

		// Sử dụng HTMLVideoElement để lấy thời lượng video
		const videoElement = document.createElement('video');
		const objectURL = URL.createObjectURL(file);
		videoElement.src = objectURL;
		setSrc(objectURL);

		videoElement.onloadedmetadata = () => {
			const videoDuration = videoElement.duration;
			setVideoInfo({
				name: fileName,
				size: parseFloat(fileSize),
				duration: videoDuration,
			});
			URL.revokeObjectURL(objectURL);
		};

		uploadVideoToCloud();
		if (videoData) {
			toast.success('Upload Video to cloud success');
		}

		console.log(videoData);
		return () => {
			URL.revokeObjectURL(objectURL);
		};
	}, [file]);

	useEffect(() => {
		socket.on('uploadProgress', (data) => {
			console.log(`Progress: ${data.progress}%`);
			setUploadProgress(data.progress);
		});

		// Cleanup listener khi component unmount
		return () => {
			socket.off('uploadProgress');
		};
	}, []);

	// Cập nhật videoData khi valueTitle thay đổi
	useEffect(() => {
		if (videoData) {
			setVideoData((prev) => ({
				...prev!,
				title: valueTitle, // Cập nhật title
			}));
		}
	}, [valueTitle]);

	return (
		<div className="flex flex-col items-center w-full space-y-3 ">
			{/* Information video */}
			<div className="w-[70%] bg-white px-6 pt-6 pb-3 rounded-lg shadow-2xl relative z-10">
				<div className="flex justify-between">
					<p className="text-3xl">{videoInfo.name}</p>
					<button
						className="px-2 py-1 bg-[#0000000D] rounded-md hover:cursor-not-allowed text-lg text-[#A3A4A7] flex items-center"
						disabled>
						<svg
							fill="black"
							viewBox="0 0 48 48"
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							className="mr-1">
							<path d="..." />
						</svg>
						Replace
					</button>
				</div>
				<span className="flex space-x-6 my-4">
					<p className="text-[#000000A6] text-lg">
						Size:{' '}
						<strong className="text-xl ml-2 text-black">
							{videoInfo.size} MB
						</strong>
					</p>
					<p className="text-[#000000A6] text-lg">
						Duration:{' '}
						<strong className="text-xl ml-2 text-black">
							{Math.floor(videoInfo.duration / 60)}m{' '}
							{Math.floor(videoInfo.duration % 60)}s
						</strong>
					</p>
				</span>
				<span className="flex justify-between items-center">
					<div>
						{uploadProgress < 100 ? (
							<div className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#00C39B]"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<p className="text-[#00C39B] text-lg ml-2">Uploading...</p>
							</div>
						) : (
							<div className="flex space-x-3">
								<img
									src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuNSAyMS4xNjczQzE3LjU2MjYgMjEuMTY3MyAyMS42NjY3IDE3LjA2MzMgMjEuNjY2NyAxMi4wMDA3QzIxLjY2NjcgNi45MzgwNCAxNy41NjI2IDIuODMzOTggMTIuNSAyLjgzMzk4QzcuNDM3NCAyLjgzMzk4IDMuMzMzMzQgNi45MzgwNCAzLjMzMzM0IDEyLjAwMDdDMy4zMzMzNCAxNy4wNjMzIDcuNDM3NCAyMS4xNjczIDEyLjUgMjEuMTY3M1pNMTYuODMxNiA4LjM4OTIxTDE1Ljk0MjEgNy44MzAxOEMxNS42OTQxIDcuNjc5NDkgMTUuMzY4NSA3Ljc1MjQgMTUuMjE3OCA4LjAwMDMyTDExLjM4NzIgMTQuMTMwMkw5LjI2MjkgMTEuNzA0NUM5LjA2ODQ1IDExLjQ4NTcgOC43Mzc5IDExLjQ2MTQgOC41MjQwMSAxMS42NTFMNy43MjY3OSAxMi4zNDYyQzcuNTA4MDQgMTIuNTM1NyA3LjQ4MzczIDEyLjg3NiA3LjY3ODE3IDEzLjA4OTlMMTAuNzM1OCAxNi41ODVDMTAuOTU0NiAxNi44Mzc4IDExLjI3NTQgMTYuOTY5MSAxMS42MDYgMTYuOTM5OUMxMS45NDE0IDE2LjkxNTYgMTIuMjM3OSAxNi43MzA5IDEyLjQxNzggMTYuNDQ0MUwxNy4wMDE4IDkuMTE4MzdDMTcuMTUyNSA4Ljg3MDQ2IDE3LjA3OTYgOC41NDQ3NiAxNi44MzE2IDguMzg5MjFaIiBmaWxsPSIjMDBDMzlCIi8+Cjwvc3ZnPgo="
									alt="Uploaded"
								/>
								<p className="text-[#00C39B] text-lg">
									{uploadProgress === 100 ? 'Uploaded' : 'Uploading'}
								</p>
							</div>
						)}
					</div>
					<p className="text-3xl font-semibold">{uploadProgress}%</p>
				</span>
				<div
					className="absolute bottom-[0.5px] left-0 h-full min-h-1 max-h-1 bg-[#00C39B] transition-all duration-300 rounded-b-[10px]"
					style={{ width: `${uploadProgress}%` }}></div>
			</div>
			<div className="w-[70%] bg-white p-6 rounded-lg shadow-2xl ">
				{/* Content */}
				<div className="w-full flex justify-between">
					<div className="w-[68%] space-y-3">
						<div>
							<p className="font-semibold text-lg mb-2">Description</p>
							<span>
								<textarea
									id="description"
									rows={4}
									aria-multiline
									aria-valuemin={0}
									aria-valuemax={4000}
									value={valueTitle}
									onChange={handleChangeTitle}
									className="min-h-[63px] px-5 py-3 w-full text-lg text-gray-900 bg-[#0000000D] rounded-lg border outline-none resize-none"
									placeholder="Write your thoughts here..."></textarea>
							</span>
						</div>

						{/*  */}
						<div>
							<p className="font-semibold text-lg mb-2">
								Who can watch this video
							</p>
							<div className="relative w-1/2">
								{/* Button to open the dropdown */}
								<div className="bg-[#0000000D] pr-2 rounded-md flex items-center">
									<button
										className="bg-transparent outline-none w-full py-3 px-4 text-left text-[19px]"
										onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
										{selectedOption}
									</button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="21"
										viewBox="0 0 20 21"
										fill="black">
										<g clipPath="url(#clip0_26676_18859)">
											<path
												d="M14.4611 8.75298C14.6238 8.9157 14.6238 9.17952 14.4611 9.34224L10.5891 13.2143C10.2637 13.5397 9.73602 13.5397 9.41058 13.2143L5.53854 9.34224C5.37582 9.17952 5.37582 8.9157 5.53854 8.75298L6.1278 8.16373C6.29052 8.00101 6.55434 8.00101 6.71705 8.16373L9.99984 11.4465L13.2826 8.16373C13.4453 8.00101 13.7092 8.00101 13.8719 8.16373L14.4611 8.75298Z"
												fill="var(--ui-text-1)"
												fillOpacity="0.48"></path>
										</g>
										<defs>
											<clipPath id="clip0_26676_18859">
												<rect
													width="20"
													height="20"
													transform="translate(0 0.125)"></rect>
											</clipPath>
										</defs>
									</svg>
								</div>

								{/* Dropdown options */}
								{isDropdownOpen && (
									<ul className="absolute bg-white w-full mt-1 border rounded-md p-1 z-10">
										{options.map((ele, index) => (
											<li
												key={index}
												className="py-3 px-4 hover:bg-gray-100 cursor-pointer text-lg rounded-md"
												onClick={() => handleSelect(ele.value)}>
												{ele.value}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>

						{/* Schedule */}
						<div>
							<p className="font-semibold text-lg">When to post</p>

							<span className="flex gap-10">
								{radios.map((ele, index) => (
									<Radio
										key={index}
										name="type"
										value={ele.value}
										label={ele.value}
										color="red"
										className="min-h-5"
										labelProps={{
											className: 'text-xl',
										}}
										onPointerEnterCapture={undefined}
										onPointerLeaveCapture={undefined}
										crossOrigin={undefined}
									/>
								))}
							</span>
						</div>

						{/* copy check */}
						<div className="flex space-x-2 items-center">
							<p className="font-semibold text-lg">Run a copyright check</p>
							<Switch
								id="custom-switch"
								ripple={false}
								className="checked:bg-red-500 w-11 min-h-6 "
								containerProps={{
									className: 'w-11 min-h-6',
								}}
								circleProps={{
									className: 'min-h-5 w-5 ml-1.5 -mr-1.5',
								}}
								onPointerEnterCapture={undefined}
								onPointerLeaveCapture={undefined}
								crossOrigin={undefined}
							/>
						</div>
						<div>
							<div className="flex items-center space-x-2 hover:cursor-pointer">
								<p className="font-semibold text-lg ">See more </p>
								<svg
									fill="currentColor"
									viewBox="0 0 48 48"
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em">
									<path d="m24 28.75 13.67-13.67a1 1 0 0 1 1.41 0l1.84 1.84a1 1 0 0 1 0 1.41L24.71 34.54a1 1 0 0 1-1.42 0L7.1 18.34a1 1 0 0 1 0-1.42l1.83-1.84a1 1 0 0 1 1.41 0L24 28.75Z"></path>
								</svg>
							</div>
							<p className="text-sm text-[#000000A6]">
								Content disclosure and other advanced settings
							</p>
						</div>
					</div>

					{/* Screen */}
					<div className="w-[27%]">
						<DemoScreen src={src} />
					</div>
				</div>
				<span className="block w-[105%] border -ml-6 mt-5 mb-4"></span>

				<ActionButtons videoData={videoData} />
			</div>
		</div>
	);
}
