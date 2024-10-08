import { Outlet } from "react-router-dom";
import HeaderUpload from "../components/HeaderUpload";
import SideBarUpload from "../components/SideBarUpload";

export default function UploadLayout() {
    return (
        <>
            <HeaderUpload />
            <div className="flex">
                <SideBarUpload/>
                <div className="w-full bg-[#F8F8F8] h-100vh">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
