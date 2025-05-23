import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useFetchUserProfileData from "../CustomHooks/useFetchUserProfileData";

const Layout = () => {

    useFetchUserProfileData();

    return (
        <div className="flex flex-col justify-between min-h-screen w-full bg-[#F5E1DA] bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] [background-size:10px_10px]">
            <Header />
            <div className="flex-grow h-full">
                <Outlet /> {/* ✅ This renders the child route component */}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
