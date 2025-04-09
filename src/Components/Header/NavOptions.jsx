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
        <div className="flex items-center w-64 p-1 h-full justify-between rounded-sm" >
            <div >
                <button 
                    className="
                                p-2 
                                rounded-lg 
                                bg-gray-800 
                                shadow-inner
                                shadow-black
                                hover:bg-gray-700
                                active:bg-gray-800
                                border-2
                                border-dashed
                                border-gray-300
                                cursor-pointer" 
                    onClick={handleHomeClick}
                >
                    Home
                </button>
            </div>
            <div >
                <button
                    className="
                                p-2 
                                rounded-lg 
                                bg-gray-800 
                                shadow-inner
                                shadow-black
                                hover:bg-gray-700
                                active:bg-gray-800
                                border-2
                                border-dashed
                                border-gray-300
                                cursor-pointer" 
                            >
                    About
                </button>
            </div>
            <div>
                <button
                    className="
                                p-2 
                                rounded-lg 
                                bg-gray-800 
                                shadow-inner
                                shadow-black
                                hover:bg-gray-700
                                active:bg-gray-800
                                border-2
                                border-dashed
                                border-gray-300
                                cursor-pointer"
                            >
                    Contact Us
                </button>
            </div>
        </div>
    )
}

export default NavOptions