import {
	Avatar,
	Button,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Tooltip,
	Typography,
} from '@material-tailwind/react';
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { handleLogoutApi } from '../api/user';

function Header() {
	const { user, isLoading, logout } = useUser();
	const [openMenu, setOpenMenu] = useState(false);
	const [valueInputSearch, setValueValueInputSearch] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(!open);

	type btn = {
		icon?: Icons.IconDefinition;
		name: string;
	};

	const listBtn: btn[] = [
		{
			icon: Icons.faUser,
			name: 'View Profile',
		},
		{
			icon: Icons.faGear,
			name: 'Settings',
		},
		{
			icon: Icons.faA,
			name: 'English',
		},
		{
			icon: Icons.faQuestionCircle,
			name: 'Feedback and help',
		},
		{
			icon: Icons.faMoon,
			name: 'Dark Mode',
		},
		{
			icon: Icons.faRightFromBracket,
			name: 'Log out',
		},
	];

	const handleChangeInputSeacrh = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setValueValueInputSearch(e.target.value);
	};

	const handleLogout = async () => {
		await handleLogoutApi();
		logout();
		toast.success('Log out succesfully');
	};

	useEffect(() => {
		console.log(isLoading);
	}, [user]);

	return (
		<div className="bg-[#121212] w-full flex items-center px-5 justify-between">
			<div className="w-[300px] hover:cursor-pointer">
				<img src={logo} width={140} alt="Tik Ok" />
			</div>
			<form className="w-[555px] h-[46px] bg-[#ffffff1f] flex items-center pl-0.5 py-2 rounded-full border-transparent hover:border-[#ffffff33] border group focus-within:border-[#ffffff33] ml-12">
				<input
					className="flex-1 border-none outline-none bg-transparent ml-4 placeholder-[#ffffffe6] text-lg text-[#ffffffe6] font-medium"
					placeholder="Search"
					value={valueInputSearch}
					onChange={handleChangeInputSeacrh}
				/>
				<span className="w-[1px] h-7 bg-[#ffffff1f]" />
				<div className="h-[44px] w-[50px] bg-transparent rounded-r-full group-hover:bg-[#ffffff1f] flex items-center group-focus-within:bg-[#ffffff1f]">
					<svg
						width="24"
						height="24"
						viewBox="0 0 48 48"
						fill="rgba(255, 255, 255, .34)"
						xmlns="http://www.w3.org/2000/svg"
						className="m-3 group-hover:fill-white group-focus-within:fill-white">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path>
					</svg>
				</div>
			</form>

			{isLoading ? (
				<div className="w-9 min-h-9 bg-[#ffffff1f] animate-pulse rounded-full"></div>
			) : user ? (
				<>
					<div className="flex items-center w-[284px] gap-7">
						<Link
							to="/upload"
							className="flex  text-white items-center bg-[#ffffff1f] px-4 py-[5px] rounded hover:bg-[#ffffff0a] mr-4 ml-[-27px]">
							<svg
								width="20px"
								data-e2e=""
								height="20px"
								viewBox="0 0 16 16"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
								className="mr-1">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"></path>
							</svg>
							<p className="text-xl font-semibold">Upload</p>
						</Link>

						<Link to={''}>
							<Tooltip
								content="Messages"
								className="bg-[#545454eb]"
								placement="bottom-start"
								animate={{
									mount: { scale: 1.3, x: -30, y: 20 },
									unmount: { scale: 0, y: 25 },
								}}>
								<FontAwesomeIcon
									icon={Icons.faPaperPlane}
									color="white"
									fontSize={25}
								/>
							</Tooltip>
						</Link>

						<Link to={'/'}>
							<Tooltip
								content="Inbox"
								placement="bottom-start"
								className="bg-[#545454eb]"
								animate={{
									mount: { scale: 1.3, x: -15, y: 20 },
									unmount: { scale: 0, y: 25 },
								}}>
								<FontAwesomeIcon
									icon={Icons.faMessage}
									color="white"
									fontSize={25}
								/>
							</Tooltip>
						</Link>

						<Menu
							placement="bottom"
							allowHover
							open={openMenu}
							handler={setOpenMenu}
							animate={{
								mount: { scale: 1.3, x: -35, y: 10 },
								unmount: { scale: 0, y: 25 },
							}}>
							<MenuHandler>
								<Avatar
									src={user?.photoProfile}
									alt=""
									size="sm"
									variant="circular"
									className="cursor-pointer"
									placeholder={undefined}
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								/>
							</MenuHandler>
							<MenuList
								className="bg-[#333333] text-white"
								placeholder={undefined}
								onPointerEnterCapture={undefined}
								onPointerLeaveCapture={undefined}>
								<div className="-mx-3 -my-2">
									{listBtn.map(({ name, icon }, index) => (
										<div key={name}>
											{index === listBtn.length - 1 ? (
												<hr className="my-3 border-white" />
											) : null}
											<MenuItem
												className="pl-2 flex items-center rounded-none hover:bg-[#444444] hover:text-white"
												onClick={name === 'Log out' ? handleLogout : undefined}
												placeholder={undefined}
												onPointerEnterCapture={undefined}
												onPointerLeaveCapture={undefined}>
												<FontAwesomeIcon icon={icon} className="w-[20px]" />
												<Typography
													variant="small"
													className="font-medium ml-3"
													placeholder={undefined}
													onPointerEnterCapture={undefined}
													onPointerLeaveCapture={undefined}>
													{name}
												</Typography>
											</MenuItem>
										</div>
									))}
								</div>
							</MenuList>
						</Menu>
					</div>
				</>
			) : (
				<div className="relative">
					<Button
						onClick={handleOpen}
						className="bg-[#ff3b5c] px-7 py-2 text-base right-0 "
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						Log In
					</Button>
					<LoginModal open={open} handleOpen={handleOpen} />
				</div>
			)}
		</div>
	);
}

export default Header;
