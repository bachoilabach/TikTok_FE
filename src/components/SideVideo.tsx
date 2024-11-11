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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	handleCreateFavouriteVideo,
	handleDeleteFavouriteVideo,
} from '../api/favourite';
import { useUser } from '../context/UserContext';
import Comment from './Comment';
import { Avatar } from '@material-tailwind/react';

interface SideVideoProps {
	videoID: string;
	userId: string;
	likeQuantity: number;
	commentQuantity: number;
	liked: boolean;
}

export default function SideVideo({
	videoID,
	likeQuantity,
	commentQuantity,
	liked,
	userId,
}: SideVideoProps) {
	const { user } = useUser();
	const navigate = useNavigate();
	const [like, setLike] = useState<boolean>(liked);
	const [localLikeQuantity, setLocalLikeQuantity] =
		useState<number>(likeQuantity);
	const [save, setSave] = useState<boolean>(false);
	const [showFollowIcon, setShowFollowIcon] = useState<boolean>(true);
	const [icon, setIcon] = useState(faPlus);
	const [localCommentQuantity, setLocalCommentQuantity] =
		useState<number>(commentQuantity);
	const [showComment, setShowComment] = useState<boolean>(false); // State để điều khiển hiển thị Comment

	const handleClickLike = async () => {
		if (like) {
			setLocalLikeQuantity(likeQuantity);
			await handleDeleteFavouriteVideo(videoID);
		} else {
			setLocalLikeQuantity(likeQuantity + 1);
			await handleCreateFavouriteVideo(videoID);
		}
		setLike(!like);
	};

	const handleClickSave = () => {
		setSave(!save);
	};

	const handleFollowClick = () => {
		setIcon(faCheck);
		setTimeout(() => {
			setShowFollowIcon(false);
		}, 2000);
	};

	const handleCommentClick = () => {
		// Thay đổi state và điều hướng đến đường dẫn mới
		setShowComment(!showComment);
		if (showComment) {
			navigate('/');
		} else {
			navigate(`/${userId}/video/${videoID}`);
		}
	};

	return (
		<div className="flex space-x-4">
			<div className="text-white flex flex-col justify-end h-[100%] space-y-2">
				<div className="relative mb-2">
					<Avatar
						src={user?.photoProfile}
						alt="User Avatar"
						variant="circular"
						className="cursor-pointer w-12 h-[48px]"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					{showFollowIcon && (
						<div
							className="absolute top-10 right-4 w-4 h-[16px] rounded-full bg-[#ff4b69] flex items-center justify-center cursor-pointer"
							onClick={handleFollowClick}>
							<FontAwesomeIcon icon={icon} />
						</div>
					)}
				</div>
				<div className="flex flex-col items-center">
					<span
						className="w-12 h-[48px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer"
						onClick={handleClickLike}>
						<FontAwesomeIcon
							icon={faHeart}
							fontSize={22}
							className={`${like ? 'text-red-600' : 'text-[#E9E9E9]'}`}
						/>
					</span>
					<p className="font-semibold mt-1 text-sm">{localLikeQuantity}</p>
				</div>

				{/* Comment */}
				<div className="flex flex-col items-center">
					<span
						className="w-12 h-[48px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]"
						onClick={handleCommentClick} // Thêm sự kiện click để mở Comment
					>
						<FontAwesomeIcon icon={faCommentDots} fontSize={22} />
					</span>
					<p className="font-semibold mt-1 text-sm">{localCommentQuantity}</p>
				</div>

				<div className="flex flex-col items-center">
					<span
						className="w-12 h-[48px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]"
						onClick={handleClickSave}>
						<FontAwesomeIcon
							icon={faBookmark}
							fontSize={22}
							className={`${save ? 'text-[#FACE16]' : 'text-[#E9E9E9]'}`}
						/>
					</span>
					<p className="font-semibold mt-1 text-sm">1000</p>
				</div>

				<div className="flex flex-col items-center">
					<span className="w-12 h-[48px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]">
						<FontAwesomeIcon icon={faShare} fontSize={22} />
					</span>
					<p className="font-semibold mt-1 text-sm">1000</p>
				</div>
				<span className="w-12 h-[48px] bg-[#ffffff1f] rounded-full flex items-center justify-center hover:cursor-pointer text-[#E9E9E9]">
					<FontAwesomeIcon icon={faEllipsis} fontSize={22} />
				</span>
			</div>

			{/* Hiển thị Comment khi showComment là true */}
			{showComment && <Comment />}
		</div>
	);
}
