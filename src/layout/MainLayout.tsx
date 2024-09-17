import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function MainLayout() {
	return (
		<>
			<Header />
			<div className="flex">
				<SideBar />

				<div className='w-full h-[90%] bg-black py-4 pl-4 pr-40'>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default MainLayout;
