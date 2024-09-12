import {
	faBookmark,
	faCheck,
	faCommentDots,
	faEllipsis,
	faHeart,
	faPlus,
	faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function SideVideo({}: Props) {
	const [like, setLike] = useState<boolean>(false);
	const [save, setSave] = useState<boolean>(false);
	const [showFollowIcon, setShowFollowIcon] = useState<boolean>(true);
	const [icon, setIcon] = useState(faPlus);

	const handleClickLike = () => {
		setLike(!like);
	};

	const handleClickSave = () => {
		setSave(!save);
	};

	const handleFollowClick = () => {
		setIcon(faCheck); // Thay đổi icon thành dấu tích
		setTimeout(() => {
			setShowFollowIcon(false); // Sau 2 giây, ẩn icon
		}, 2000);
	};

	return (
		<div className="text-white flex flex-col justify-end h-[100%] space-y-2">
			<Link to={''}>
				<div className='relative mb-2'>
					<Avatar
						src="https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg"
						alt="kha banh"
						variant="circular"
						className="cursor-pointer w-14 h-[56px]"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					{showFollowIcon && (
						<div
							className="absolute top-10 right-4 w-6 h-[24px] rounded-full bg-[#ff4b69] flex items-center justify-center cursor-pointer"
							onClick={handleFollowClick}>
							<FontAwesomeIcon icon={icon} />
						</div>
					)}
				</div>
			</Link>
			<div className="flex flex-col items-center">
				<span
					className="w-14 h-[56px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer hover:"
					onClick={handleClickLike}>
					<FontAwesomeIcon
						icon={faHeart}
						fontSize={24}
						className={`${like ? 'text-red-600' : 'text-[#E9E9E9]'}`}
					/>
				</span>
				<p className="font-semibold mt-1 text-sm">1234</p>
			</div>

			<div className="flex flex-col items-center">
				<Link to={''}>
					<span className="w-14 h-[56px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]">
						<FontAwesomeIcon icon={faCommentDots} fontSize={24} />
					</span>
				</Link>
				<p className="font-semibold mt-1 text-sm">1234</p>
			</div>

			<div className="flex flex-col items-center">
				<span
					className="w-14 h-[56px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]"
					onClick={handleClickSave}>
					<FontAwesomeIcon
						icon={faBookmark}
						fontSize={23}
						className={`${save ? 'text-[#FACE16]' : 'text-[#E9E9E9]'}`}
					/>
				</span>
				<p className="font-semibold mt-1">1234</p>
			</div>

			<div className="flex flex-col items-center">
				<span className="w-14 h-[56px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]">
					<FontAwesomeIcon icon={faShare} fontSize={23} />
				</span>
				<p className="font-semibold mt-1 text-sm">1234</p>
			</div>
			<span className="w-14 h-[56px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]">
				<FontAwesomeIcon icon={faEllipsis} fontSize={23} />
			</span>
		</div>
	);
}
