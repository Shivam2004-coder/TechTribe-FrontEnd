import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavOptions = () => {
    // const location = useLocation();
    const navigate = useNavigate();

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
        <div className="flex items-center w-10/12 h-full rounded-sm" >
            <button 
                className=" hover:bg-blue-700 
                            active:bg-blue-900 
                            h-full 
                            flex 
                            items-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out" 
                onClick={handleHomeClick}
            >
                Home
            </button>
            <button 
                className=" hover:bg-blue-700 
                            active:bg-blue-800 
                            h-full 
                            flex 
                            items-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out"  
                onClick={handlePremiumClick}
            >
                Premium
            </button>
            <button
                className=" hover:bg-blue-700 
                            active:bg-blue-800 
                            h-full 
                            flex 
                            items-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out"  
            >
                About
            </button>
            <button
                className=" hover:bg-blue-700 
                            active:bg-blue-800 
                            h-full 
                            flex 
                            items-center
                            p-2 
                            cursor-pointer
                            transition-colors 
                            duration-150 
                            ease-in-out" 
            >
                Contact Us
            </button>
        </div>
    )
}

export default NavOptions