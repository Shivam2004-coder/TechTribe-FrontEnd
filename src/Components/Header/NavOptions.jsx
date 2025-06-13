import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavOptions = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    const [zoomLevel, setZoomLevel] = useState(100); // Default to 100%

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

    const renderContent = (text, IconName) => {
        if (zoomLevel <= 67) {
            return <span className="hover:text-black
                                    transition-colors 
                                    duration-400 
                                    ease-in-out" 
                    >
                        {text}
                    </span>;
        }
        else {
            return <i className="material-icons 
                                hover:text-black
                                transition-colors 
                                duration-400 
                                ease-in-out"
                    >
                    {IconName}
                    </i>
        }
    };

    // const handleAboutClick = () => {
    //     if ( location !== "/about" ) {
    //         navigate("/about")
    //     }
    // }

    // const handleContactUsClick = () => {
    //     if ( location !== "/contactus" ) {
    //         navigate("/contactus");
    //     }
    // }


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
            >
                {renderContent("Contact Us","help")}
            </button>
        </div>
    )
}

export default NavOptions