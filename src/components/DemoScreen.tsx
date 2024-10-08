import { Avatar } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

interface DemoScreenProps {
	src: string; // Thêm prop src
}

type optionScreen = {
	value: string;
};

const optionScreens: optionScreen[] = [
	{
		value: 'Feed',
	},
	{
		value: 'Profile',
	},
	{
		value: 'Web/TV',
	},
];

export default function DemoScreen({ src }: DemoScreenProps) {
	// State để theo dõi nút đang được chọn
	const [selectedTab, setSelectedTab] = useState<string>('Feed');

	// Hàm để cập nhật tab khi nhấn vào nút
	const handleTabClick = (tab: string) => {
		setSelectedTab(tab);
	};

	useEffect(() => {}, [src]);

	return (
		<div className="w-full">
			{/* List */}
			<div className="w-full bg-[#0000000D] flex justify-between p-[3px] rounded-md">
				{optionScreens.map((ele, index) => (
					<button
						key={index}
						className={`w-1/3 rounded-md py-1 font-semibold ${
							selectedTab === ele.value
								? 'bg-white'
								: 'bg-transparent text-[#000000A6]'
						}`}
						onClick={() => handleTabClick(ele.value)}>
						{ele.value}
					</button>
				))}
			</div>

			{/* Nội dung hiển thị dựa trên tab đã chọn */}
			<div className="mt-4 w-full min-h-[618px] ">
				{selectedTab === 'Feed' && (
					<div className="w-full min-h-[618px] border-[6px] border-black rounded-[50px] relative">
						<span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black text-white px-10 py-3 rounded-full mt-2 z-10"></span>
						<img
							src="src\assets\top_section.png"
							className="absolute top-8 w-full bg-transparent min-h-6 z-10"
						/>
						<video
							src={src}
							className="absolute top-0 left-0 w-full min-h-[92%] object-cover rounded-t-[42px] z-0"
							onMouseEnter={(e) =>
								e.currentTarget.setAttribute('controls', 'true')
							}
							onMouseLeave={(e) => e.currentTarget.removeAttribute('controls')}
							controls
						/>
						<img
							src="src\assets\bottom_device_iphone.png"
							className="absolute bottom-0 left-0 rounded-b-[42px] -mb-1 w-full min-h-[10%]"
						/>
						<div className="absolute right-2 bottom-28">
							<img
								src="src\assets\sidebar.png"
								className="bg-transparent w-8 min-h-28"
							/>
						</div>
					</div>
				)}
				{selectedTab === 'Profile' && (
					<div className="w-full max-h-[618px] min-h-[618px] border-[6px] border-black rounded-[50px] flex flex-col items-center">
						{/* Top */}
						<span className=" bg-black px-10 py-3 rounded-full w-1/4 mt-2"></span>
						<div className="flex justify-between px-2 mt-6 w-full">
							<svg
								width="7"
								height="12"
								viewBox="0 0 7 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2.20812 5.99836L6.76364 1.44285C6.89381 1.31267 6.89382 1.10162 6.76364 0.971444L6.15082 0.358618C6.02064 0.228443 5.80959 0.228442 5.67941 0.358617L0.275366 5.76266C0.145191 5.89284 0.145191 6.10389 0.275365 6.23407L5.67941 11.6381C5.80958 11.7683 6.02064 11.7683 6.15081 11.6381L6.76364 11.0253C6.89382 10.8951 6.89381 10.6841 6.76364 10.5539L2.20812 5.99836Z"
									fill="black"></path>
							</svg>
							<span className="flex space-x-3">
								<svg
									width="17"
									height="16"
									viewBox="0 0 17 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M5.60899 4.77609C5.76139 3.20121 7.08492 1.99959 8.66715 1.99959C10.2494 1.99959 11.5729 3.20121 11.7253 4.77609L12.0668 8.30462C12.1589 9.25611 12.6876 9.94641 13.2542 10.6663H4.08012C4.64673 9.94641 5.17544 9.25611 5.26752 8.30462L5.60899 4.77609ZM8.66715 0.66626C6.39828 0.66626 4.5004 2.38934 4.28185 4.64766L3.94038 8.17619C3.83761 9.23818 2.80573 10.1296 2.18312 10.9206C1.83888 11.3579 2.15042 11.9996 2.70697 11.9996H14.6273C15.1839 11.9996 15.4954 11.3579 15.1512 10.9206C14.5286 10.1296 13.4967 9.23817 13.3939 8.17619L13.0524 4.64766C12.8339 2.38934 10.936 0.66626 8.66715 0.66626ZM10.9686 13.6643C11.0038 13.4836 10.8512 13.3329 10.6672 13.3329H6.66716C6.48306 13.3329 6.33055 13.4836 6.3657 13.6643C6.7949 15.8705 10.5394 15.8705 10.9686 13.6643Z"
										fill="black"></path>
								</svg>
								<svg
									width="17"
									height="16"
									viewBox="0 0 17 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M2.00098 7.99959C2.00098 7.26321 2.59793 6.66626 3.33431 6.66626C4.07069 6.66626 4.66764 7.26321 4.66764 7.99959C4.66764 8.73597 4.07069 9.33293 3.33431 9.33293C2.59793 9.33293 2.00098 8.73597 2.00098 7.99959ZM7.00098 7.99959C7.00098 7.26321 7.59793 6.66626 8.33431 6.66626C9.07069 6.66626 9.66764 7.26321 9.66764 7.99959C9.66764 8.73597 9.07069 9.33293 8.33431 9.33293C7.59793 9.33293 7.00098 8.73597 7.00098 7.99959ZM12.001 7.99959C12.001 7.26321 12.5979 6.66626 13.3343 6.66626C14.0707 6.66626 14.6676 7.26321 14.6676 7.99959C14.6676 8.73597 14.0707 9.33293 13.3343 9.33293C12.5979 9.33293 12.001 8.73597 12.001 7.99959Z"
										fill="black"></path>
								</svg>
							</span>
						</div>

						{/* Ava */}
						<div className="flex flex-col items-center">
							<Avatar
								src="https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg"
								alt=""
								size="lg"
								variant="circular"
								className="mt-4"
								placeholder={undefined}
								onPointerEnterCapture={undefined}
								onPointerLeaveCapture={undefined}
							/>
							<p className="text-xs font-semibold mt-1">Khá bank</p>
							<span className="w-36 animate-pulse min-h-5 bg-gray-300 mt-1 rounded-sm"></span>
							<div className="flex space-x-2 w-36">
								<span className="w-1/2 animate-pulse min-h-5 bg-gray-300 mt-1 rounded-sm"></span>
								<span className="w-1/2 animate-pulse min-h-5 bg-gray-300 mt-1 rounded-sm"></span>
							</div>
						</div>
						{/* Middle */}
						<div className="flex mt-4 justify-between w-full px-7">
							<div className="border-b-2 border-[#000]">
								<svg
									width="25"
									height="17"
									viewBox="0 0 25 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										clipRule="evenodd"
										d="M4.33431 2.99976C4.15021 2.99976 4.00098 3.14899 4.00098 3.33309V7.33309C4.00098 7.51718 4.15021 7.66642 4.33431 7.66642H5.00098C5.18507 7.66642 5.33431 7.51718 5.33431 7.33309V3.33309C5.33431 3.14899 5.18507 2.99976 5.00098 2.99976H4.33431ZM4.33431 8.99976C4.15021 8.99976 4.00098 9.14899 4.00098 9.33309V13.3331C4.00098 13.5172 4.15021 13.6664 4.33431 13.6664H5.00098C5.18507 13.6664 5.33431 13.5172 5.33431 13.3331V9.33309C5.33431 9.14899 5.18507 8.99976 5.00098 8.99976H4.33431ZM8.00098 3.33309C8.00098 3.14899 8.15022 2.99976 8.33431 2.99976H9.00098C9.18507 2.99976 9.33431 3.14899 9.33431 3.33309V7.33309C9.33431 7.51718 9.18507 7.66642 9.00098 7.66642H8.33431C8.15022 7.66642 8.00098 7.51718 8.00098 7.33309V3.33309ZM8.33431 8.99976C8.15022 8.99976 8.00098 9.14899 8.00098 9.33309V13.3331C8.00098 13.5172 8.15022 13.6664 8.33431 13.6664H9.00098C9.18507 13.6664 9.33431 13.5172 9.33431 13.3331V9.33309C9.33431 9.14899 9.18507 8.99976 9.00098 8.99976H8.33431ZM12.001 3.33309C12.001 3.14899 12.1502 2.99976 12.3343 2.99976H13.001C13.1851 2.99976 13.3343 3.14899 13.3343 3.33309V7.33309C13.3343 7.51718 13.1851 7.66642 13.001 7.66642H12.3343C12.1502 7.66642 12.001 7.51718 12.001 7.33309V3.33309ZM12.3343 8.99976C12.1502 8.99976 12.001 9.14899 12.001 9.33309V13.3331C12.001 13.5172 12.1502 13.6664 12.3343 13.6664H13.001C13.1851 13.6664 13.3343 13.5172 13.3343 13.3331V9.33309C13.3343 9.14899 13.1851 8.99976 13.001 8.99976H12.3343Z"
										fill="#161823"></path>
									<path
										fill-rule="evenodd"
										clipRule="evenodd"
										d="M20.9199 10.2047C20.7869 10.3599 20.5468 10.3599 20.4138 10.2047L18.1385 7.55026C17.9532 7.33404 18.1068 7 18.3916 7L22.9421 7C23.2269 7 23.3805 7.33404 23.1952 7.55026L20.9199 10.2047Z"
										fill="#161823"></path>
								</svg>
							</div>
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.2338 5.00002V11.5679L14.3937 10.333C14.4819 10.239 14.6296 10.2344 14.7235 10.3226L15.2094 10.779C15.3034 10.8672 15.308 11.0149 15.2198 11.1088L13.1345 13.3291C12.8335 13.6497 12.325 13.6518 12.0213 13.3338L9.90119 11.1142C9.81218 11.021 9.81557 10.8733 9.90875 10.7843L10.3908 10.3238C10.484 10.2348 10.6317 10.2382 10.7207 10.3314L12.1005 11.7759V5.00002C12.1005 4.20841 11.4588 3.56668 10.6672 3.56668H9.50051C9.37164 3.56668 9.26718 3.46222 9.26718 3.33335V2.66668C9.26718 2.53782 9.37164 2.43335 9.50051 2.43335H10.6672C12.0847 2.43335 13.2338 3.58249 13.2338 5.00002Z"
									fill="black"
									fill-opacity="0.32"></path>
								<path
									d="M6.61407 5.77906L5.23384 4.33407V11C5.23384 11.7916 5.87557 12.4333 6.66718 12.4333H7.83384C7.96271 12.4333 8.06718 12.5378 8.06718 12.6667V13.3334C8.06718 13.4622 7.96271 13.5667 7.83384 13.5667H6.66718C5.24965 13.5667 4.10051 12.4175 4.10051 11V4.54305L2.94113 5.77751C2.8529 5.87145 2.70524 5.87608 2.6113 5.78786L2.12535 5.33146C2.03142 5.24324 2.02679 5.09558 2.11501 5.00164L4.20026 2.78135C4.50132 2.46079 5.00975 2.45865 5.3135 2.77665L7.43361 4.99625C7.52262 5.08944 7.51924 5.23714 7.42605 5.32615L6.94397 5.78663C6.85078 5.87564 6.70308 5.87225 6.61407 5.77906Z"
									fill="black"
									fill-opacity="0.32"></path>
							</svg>
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M3.57085 3.51877C4.98336 2.11707 7.21431 2.1382 8.66764 3.7288C10.121 2.1382 12.3519 2.11707 13.7644 3.51877C14.7248 4.47182 15.0386 5.82425 14.7059 7.0383L13.833 6.16544C13.8551 5.46719 13.5974 4.76187 13.06 4.22859C12.0421 3.21843 10.4211 3.21985 9.33928 4.47851L9.32635 4.49355L9.01984 4.79772C8.82489 4.99117 8.5104 4.99117 8.31545 4.79772L8.00893 4.49355L7.99601 4.47851C6.91422 3.21985 5.29318 3.21843 4.27524 4.22859C3.24289 5.25304 3.24289 6.91241 4.27524 7.93686L8.66764 12.2957L9.31792 11.6504L10.025 12.3575L9.01984 13.355C8.82489 13.5484 8.5104 13.5484 8.31545 13.355L3.57085 8.64668C2.14435 7.23109 2.14435 4.93436 3.57085 3.51877ZM14.6192 10.6183C14.8404 10.4071 15.0233 10.1989 15.16 10.0231C15.2444 9.91446 15.3153 9.81288 15.3679 9.72595C15.3937 9.68321 15.4196 9.63665 15.4408 9.58986L15.442 9.5873C15.4542 9.56069 15.501 9.45827 15.501 9.33342C15.501 9.23331 15.4716 9.14831 15.4619 9.12048L15.4618 9.12002C15.4463 9.07529 15.4268 9.02965 15.4061 8.98587C15.3642 8.89732 15.3065 8.79335 15.2346 8.68108C15.0906 8.45613 14.8786 8.17981 14.5969 7.90992C14.0334 7.36986 13.1657 6.83342 12.001 6.83342C11.6305 6.83342 11.2901 6.88768 10.98 6.97908L11.8391 7.83823C11.8922 7.83505 11.9462 7.83342 12.001 7.83342C12.8362 7.83342 13.4686 8.21364 13.905 8.63191C14.1234 8.84119 14.2863 9.05445 14.3923 9.22013C14.4127 9.25196 14.4306 9.28138 14.446 9.30802C14.4245 9.33823 14.3994 9.37217 14.3704 9.40938C14.259 9.55283 14.1029 9.73025 13.9119 9.91097L14.6192 10.6183ZM12.6719 10.7115C12.4533 10.7887 12.2281 10.8334 12.001 10.8334C11.3513 10.8334 10.7164 10.4676 10.2105 10.021C9.96414 9.80358 9.76561 9.58191 9.63151 9.40938C9.60258 9.37217 9.57742 9.33823 9.55595 9.30802C9.57138 9.28138 9.58924 9.25196 9.60961 9.22013C9.71565 9.05445 9.87855 8.84119 10.0969 8.63191C10.1788 8.55345 10.2676 8.47633 10.3633 8.40281L12.6719 10.7115ZM9.65168 7.69122C9.56385 7.76316 9.48163 7.83651 9.40502 7.90992C9.1234 8.17981 8.91131 8.45613 8.76734 8.68108C8.69549 8.79335 8.63772 8.89732 8.59585 8.98587C8.57514 9.02965 8.55565 9.07529 8.54017 9.12002L8.54001 9.12048C8.53039 9.14831 8.50098 9.23331 8.50098 9.33342C8.50098 9.45827 8.54778 9.56069 8.55994 9.5873L8.56111 9.58986C8.58233 9.63665 8.60823 9.68321 8.63408 9.72595C8.68666 9.81288 8.75754 9.91446 8.84196 10.0231C9.01147 10.2412 9.25228 10.5091 9.54879 10.7708C10.1287 11.2826 10.9938 11.8334 12.001 11.8334C12.5229 11.8334 13.0066 11.6855 13.4323 11.4718L14.0784 12.118C14.2086 12.2481 14.4197 12.2481 14.5498 12.118L14.7855 11.8823C14.9157 11.7521 14.9157 11.541 14.7855 11.4109L9.9236 6.54893C9.79343 6.41876 9.58237 6.41876 9.4522 6.54893L9.2165 6.78464C9.08632 6.91481 9.08632 7.12587 9.2165 7.25604L9.65168 7.69122Z"
									fill="black"
									fill-opacity="0.32"></path>
							</svg>
						</div>

						{/* Content */}
						<div className="p-1 w-full grid grid-cols-3 gap-1">
							<div className="w-full max-h-[115px] overflow-hidden relative">
								<video src={src} className="object-cover w-full max-h-32 min-h-32" />
								<div className="absolute bottom-0 flex items-center p-1">
									<svg
										width="12"
										height="11"
										viewBox="0 0 12 11"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M4.5 2.77116V7.89968L8.80134 5.33542L4.5 2.77116ZM3.5 2.28217C3.5 1.7217 4.11064 1.37482 4.59205 1.66182L9.71363 4.71507C10.1835 4.99518 10.1835 5.67566 9.71363 5.95577L4.59205 9.00902C4.11064 9.29602 3.5 8.94914 3.5 8.38867V2.28217Z"
											fill="white"></path>
									</svg>
									<p className="text-white text-[9px] ml-0.5 font-semibold">
										10000
									</p>
								</div>
							</div>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((ele, index) => (
								<span
									key={index}
									className={`w-full min-h-[112px] animate-pulse bg-gray-300 ${
										index === 5
											? 'rounded-bl-[30px]'
											: index === 7
											? 'rounded-br-[30px]'
											: ''
									}`}></span>
							))}
						</div>
					</div>
				)}
				{selectedTab === 'Web/TV' && (
					<div className="relative w-full bg-black">
						<video
							src={src}
							className="w-full max-h-40"
							controls
							onMouseEnter={(e) =>
								e.currentTarget.setAttribute('controls', 'true')
							}
							onMouseLeave={(e) => e.currentTarget.removeAttribute('controls')}
						/>
						<div className="absolute right-2 bottom-3">
							<img
								src="src\assets\sidebar.png"
								className="bg-transparent w-4 min-h-28"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
