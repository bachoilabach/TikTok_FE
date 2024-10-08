import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ForYou from './pages/ForYou';
import UploadLayout from './layout/UploadLayout';
import UploadPage from './pages/UploadPage';

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<ForYou />} />
					</Route>
					<Route path="/upload" element={<UploadLayout />}>
						<Route index element={<UploadPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
