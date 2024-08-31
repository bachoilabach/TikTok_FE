import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function MainLayout() {
	return (
		<>
			<Header />
			<div className="flex">
				<SideBar />

				<div className='w-full h-full bg-black'>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default MainLayout;
