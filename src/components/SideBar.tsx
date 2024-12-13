import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { handleGetAllFollowApi } from '../api/follow';
export type Following = {
	_id: string;
	fullname: string;
	username: string;
	email: string;
	photoProfile: string;
};
function SideBar() {
	// * Change color button when user click
	const [selectedPath, setSelectedPath] = useState<string>('/');
	const location = useLocation();
	const currentPath = location.pathname;
	const { user } = useUser();
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
			avatar: user?.photoProfile,
		},
	];

	// * Follower
	const [listFollowing, setListFollowing] = useState<Following[]>([]);

	const handleGetAllFollow = async () => {
		const response = await handleGetAllFollowApi();
		setListFollowing(response.metadata);
	};

	useEffect(() => {
		handleGetAllFollow();
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
								src={
									ele?.avatar ||
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FoNFztYrjisKytpNypxcpYf_tQqGme8q5Q&s'
								}
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
				{user ? (
					<div className="">
						<Typography
							variant="h6"
							placeholder={undefined}
							onPointerEnterCapture={undefined}
							onPointerLeaveCapture={undefined}>
							Following accounts
						</Typography>
						<div>
							{listFollowing.map((following) => (
								<Link
									key={following._id}
									className="mt-2 p-2 flex items-center rounded hover:bg-[#ffffff1f]"
									to={''}>
									<div className="h-8">
										<Avatar
											src={
												following.photoProfile ||
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
											{following.fullname}
										</Typography>
										<Typography
											variant="small"
											placeholder={undefined}
											onPointerEnterCapture={undefined}
											onPointerLeaveCapture={undefined}>
											{following.username}
										</Typography>
									</div>
								</Link>
							))}
							{listFollowing.length > 10 ? <div>See more</div> : <div></div>}
						</div>
					</div>
				) : (
					<div className="text-xl text-[#878787]">
						Log in to follow creators, like videos, and view comments.
					</div>
				)}

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
