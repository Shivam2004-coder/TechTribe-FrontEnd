import { useLocation, useNavigate } from "react-router-dom";

const Logo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleLogoClick = () => {
        if ( location.pathname !== "/tribe" ) {
            navigate("/tribe");
        }
    }

    return (
        <div
            className={`font-bold text-2xl text-white rounded-lg 
                       w-full 
                       flex ${location.pathname === "/profile" || location.pathname === "/settings" ? " justify-center md:justify-start md:pl-20" : "justify-start" } 
                       items-center
                       cursor-pointer
                       `}
            onClick={handleLogoClick}
        >
            <img 
                src="/techTribeLogo1.png" 
                alt="WebsiteLogo" 
                className="h-10 w-10 md:h-15 md:w-15 mx-1"
            />
            <h1 className="text-md md:text-4xl ">techTribe</h1>
        </div>
    );
};

export default Logo;
