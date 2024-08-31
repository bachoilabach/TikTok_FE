import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
	// * Change color button when user click
	const [selectedPath, setSelectedPath] = useState<string>('/');
	const location = useLocation();
	const currentPath = location.pathname;

	const handleClick = (path: string) => {
		setSelectedPath(path);
		console.log(selectedPath);
	};
	// * List button
	type btn = {
		icon?: Icons.IconDefinition;
		name: string;
		path: string;
		avatar?: string;
	};

	const listBtn: btn[] = [
		{
			icon: Icons.faHome,
			name: 'For you',
			path: '/',
		},
		{
			icon: Icons.faCompass,
			name: 'Explore',
			path: '/explore',
		},
		{
			icon: Icons.faUser,
			name: 'Following',
			path: '/following',
		},
		{
			icon: Icons.faUserGroup,
			name: 'Friends',
			path: '/friends',
		},
		{
			icon: Icons.faVideo,
			name: 'LIVE',
			path: '/live',
		},
		{
			name: 'Profile',
			path: '/profile',
			avatar:
				'https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg',
		},
	];

	// * Follower
	type following = {
		avatar?: string;
		userID: string;
		userName: string;
	};

	const [listFollowing, setListFollowing] = useState<following[]>([]);

	useEffect(() => {
		setListFollowing([
			{
				avatar: '',
				userID: 'khabanh',
				userName: 'Khá bảnh',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan1',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan2',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan3',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan4',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan5',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan6',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan6',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan6',
				userName: 'Phạm Tuấn',
			},
			{
				avatar: 'https://nguoinoitieng.tv/images/nnt/100/0/bej1.jpg',
				userID: 'phamtuan6',
				userName: 'Phạm Tuấn',
			},
			{
				avatar:
					'data:image/jpeg;base64,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',
				userID: 'khabanh',
				userName: 'Khá bảnh',
			},
		]);
	}, []);

	return (
		<div className="w-[260px] h-screen-minus-59 bg-[#121212] border-t border-[#ffffff1f] px-2 pt-5 pb-6 flex flex-col overflow-auto scroll-smooth scrollbar-hidden">
			<div className="text-white flex flex-col space-y-2">
				{listBtn.map((ele) => (
					<Link
						to={ele.path}
						className={`flex items-center p-2 hover:bg-[#444444] active:text-[#ff3b5c] ${
							currentPath === ele.path ? 'text-[#ff3b5c]' : ''
						}`}
						key={ele.name}
						onClick={() => handleClick(ele.path)}>
						{/* Kiểm tra nếu `icon` là `null` thì sử dụng avatar */}
						{ele.icon ? (
							<FontAwesomeIcon icon={ele.icon} className="text-2xl w-7" />
						) : (
							<Avatar
								src={ele.avatar}
								alt={ele.name}
								// size="sm"
								variant="circular"
								className="cursor-pointer w-7 h-7"
								placeholder={undefined}
								onPointerEnterCapture={undefined}
								onPointerLeaveCapture={undefined}
							/>
						)}
						<p className="text-xl ml-3 font-semibold">{ele.name}</p>
					</Link>
				))}
				<span className="w-[90%] h-[1px] bg-[#ffffff1f]"></span>

				{/* List follower */}
				<div className="">
					<Typography
						variant="h6"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						Following accounts
					</Typography>
					{listFollowing.map((following) => (
						<Link
							key={following.userID}
							className="mt-2 p-2 flex items-center rounded hover:bg-[#ffffff1f]"
							to={''}>
							<div className="h-8">
								<Avatar
									src={
										following.avatar ||
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FoNFztYrjisKytpNypxcpYf_tQqGme8q5Q&s'
									}
									variant="circular"
									alt=""
									style={{ width: '35px', height: '35px' }}
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								/>
							</div>

							<div className="ml-3">
								<Typography
									variant="h5"
									className=""
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}>
									{following.userName}
								</Typography>
								<Typography
									variant="small"
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}>
									{following.userID}
								</Typography>
							</div>
						</Link>
					))}
					{listFollowing.length > 10 ? <div>See more</div> : <div></div>}
				</div>

				<span className="w-[90%] h-[1px] bg-[#ffffff1f]"></span>

				{/* footer side bar */}
				<Link className="space-y-3 text-[#ffffff80]" to={'/'}>
					<Typography
						variant="h6"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						Company
					</Typography>
					<Typography
						variant="h6"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						Program
					</Typography>
					<Typography
						variant="h6"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						Terms & Poicies
					</Typography>
				</Link>
			</div>
		</div>
	);
}

export default SideBar;
