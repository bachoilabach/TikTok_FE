import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function MainLayout() {
	return (
		<>
			<Header />
			<SideBar />
			<Outlet />
		</>
	);
}

export default MainLayout;
