import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const NavOptions = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    const [zoomLevel, setZoomLevel] = useState(100); // Default to 100%
    const displayMode = useSelector((store) => store.profile.displayMode);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateZoomAndWidth = () => {
            const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
            setZoomLevel(zoom);
            setScreenWidth(window.innerWidth);
        };

        updateZoomAndWidth(); // Initial check
        window.addEventListener('resize', updateZoomAndWidth);

        return () => {
            window.removeEventListener('resize', updateZoomAndWidth);
        };
    }, []);


    useEffect(() => {
        const updateZoom = () => {
            const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
            setZoomLevel(zoom);
        };

        updateZoom(); // Initial check
        window.addEventListener('resize', updateZoom);

        return () => {
            window.removeEventListener('resize', updateZoom);
        };
    }, []);

    const handleHomeClick = () => {
        if ( location !== "/tribe" ) {
            navigate("/tribe");
        }
    }

    const handlePremiumClick = () => {
        if ( location !== "/premium" ) {
            navigate("/premium");
        }
    }

    // const hoverStyle = displayMode === "Light" ? "hover:text-white" : "hover:text-black";
    const hoverStyle = "";

    const renderContent = (text, IconName) => {
        // 👇 Only icons on small screens (mobile < 768px)
        if (screenWidth < 768) {
            return <i className={`${hoverStyle} hover:text-white text-black  material-icons transition-colors duration-400 ease-in-out `}>{IconName}</i>;
        }
        // 👇 Icons or text on larger screens based on zoom level
        if (zoomLevel <= 67) {
            return <span className={`${hoverStyle} hover:text-white text-black transition-colors duration-400 ease-in-out `}>{text}</span>;
        } else {
            return <i className={`${hoverStyle} hover:text-white text-black  material-icons transition-colors duration-400 ease-in-out `}>{IconName}</i>;
        }
    };

    const handleAboutClick = () => {
        if ( location !== "/about-us" ) {
            navigate("/about-us")
        }
    }

    const handleContactUsClick = () => {
        if ( location !== "/contact" ) {
            navigate("/contact");
        }
    }


    return (
        <div className="flex items-center w-10/12 md:w-7/12 justify-end h-full rounded-sm" >
            <button 
                className=" hover:bg-blue-700 
                            active:bg-blue-900 
                            h-full 
                            flex-grow
                            flex 
                            items-center
                            justify-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out" 
                onClick={handleHomeClick}
            >
                {renderContent("Home","home")}

            </button>
            <button 
                className=" hover:bg-blue-700 
                            active:bg-blue-800 
                            h-full 
                            flex-grow
                            flex 
                            items-center
                            justify-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out"  
                onClick={handlePremiumClick}
            >
                {renderContent("Premium","diamond")}
            </button>
            <button
                className=" hover:bg-blue-700 
                            active:bg-blue-800 
                            h-full 
                            flex-grow
                            flex 
                            items-center
                            justify-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out"  
                onClick={handleAboutClick}
            >
                {renderContent("About","info")}
            </button>
            <button
                className=" hover:bg-blue-700 
                            active:bg-blue-800 
                            h-full 
                            flex-grow
                            flex 
                            items-center
                            justify-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out" 
                onClick={handleContactUsClick}
            >
                {renderContent("Contact Us","help")}
            </button>
        </div>
    )
}

export default NavOptions