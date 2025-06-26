import { useLocation, useNavigate } from "react-router-dom";

const Logo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleLogoClick = () => {
        if ( location !== "/tribe" ) {
            navigate("/tribe");
        }
    }

    return (
        <div
            className="font-bold text-2xl text-white rounded-lg 
                       p-4
                       w-full
                       flex justify-center
                       items-center
                       cursor-pointer
                       "
            onClick={handleLogoClick}
        >
            <img 
                src="/techTribeLogo1.png" 
                alt="WebsiteLogo" 
                className="h-6 w-6 md:h-15 md:w-15 mx-1"
            />
            <h1 className="text-sm md:text-4xl">techTribe</h1>
        </div>
    );
};

export default Logo;
