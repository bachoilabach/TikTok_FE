import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
	_id: string;
	username: string;
	fullname: string;
	email: string;
	phone: string;
	photoProfile: string;
	// Thêm các thuộc tính khác nếu cần
}

// Định nghĩa kiểu dữ liệu cho Context
interface UserContextProps {
	user: User | null;
	isLoading: boolean
	login: (userData: User) => void;
	logout: () => void;
}

// Tạo Context với giá trị mặc định là null
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provider component cho phép con của nó truy cập vào user data
export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading,setIsLoading] = useState<boolean>(true)
	useEffect(()=>{
		const storageUser = localStorage.getItem('user');
		if(storageUser){
			setUser(JSON.parse(storageUser))
		}
		setIsLoading(false)
	},[])
	const [user, setUser] = useState<User | null>(null);


	// Hàm đăng nhập, lưu thông tin người dùng vào state
	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	// Hàm đăng xuất, xóa thông tin người dùng khỏi state
	const logout = () => {
		setUser(null);
		localStorage.clear()
	};

	return (
		<UserContext.Provider value={{ user,isLoading, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook để sử dụng UserContext dễ dàng hơn
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextProps => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
