import { Avatar } from '@material-tailwind/react';

export default function HeaderUpload() {
	return (
		<div className="flex pl-5 pr-14 min-h-16 items-center border-b justify-between">
			<div className="flex items-center space-x-3 hover:cursor-pointer">
				<img src="src/assets/TikTok_Logo_white.png" width={125} height={48} />
				{/* 24F4ED FE2C55 */}
				<div className="flex">
					<span className="bg-[#24F4ED] w-2 -mr-[5px] rounded-l-[4px]"></span>
					<div className="font-bold bg-black text-white h-[100%] text-xl rounded-[3px] px-3 z-10">
						Studio
					</div>
					<span className="bg-[#FE2C55] w-2 -ml-[5px] rounded-r-[4px]"></span>
				</div>
			</div>
			<div>
				<Avatar
					src="https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg"
					alt=""
					size="sm"
					variant="circular"
					className="cursor-pointer"
					placeholder={undefined}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				/>
			</div>
		</div>
	);
}
