import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useFetchUserProfileData from "../CustomHooks/useFetchUserProfileData";
import { useSelector } from "react-redux";

const Layout = () => {

    useFetchUserProfileData();

    let wallpaperImage = useSelector((store) => store.profile.wallpaperImage);

    // bg-[#F5E1DA] bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] [background-size:10px_10px]
    const location = useLocation();
    const shouldDisplay = location === "/onboarding" || "/login";
    if ( shouldDisplay ) {
        wallpaperImage = "loginBackground2_jxu20x";
    }

    return (
        <div className={`flex flex-col justify-between min-h-screen  max-w-screen overflow-x-clip `}
            style={{
                backgroundImage: `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${wallpaperImage}")`,
                // backgroundImage: "url('/loginBackground3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                backgroundAttachment: "fixed"
            }}
        >
            <Header />
            <div className="flex-grow w-full flex items-center justify-center">  {/* removed the h-screen and flex and added w-full */}
                <Outlet /> {/* ✅ This renders the child route component */}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
