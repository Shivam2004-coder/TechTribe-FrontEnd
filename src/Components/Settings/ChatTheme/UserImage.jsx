import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChatThemeImage } from '../../../utils/ReduxStore/profileSlice';
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import useSaveImages from '../../../CustomHooks/useSaveImages';

const UserImage = (props) => {

    const { isOpen, setIsOpen , isSaving , setIsSaving } = props;

    // Create a Cloudinary instance and set your cloud name.

    const { handleSaveProfileClick } = useSaveImages();
    const chatThemeImage = useSelector((store) => store.profile.chatThemeImage);
    // console.log("i am in the Chat Theme User Image.");
    // console.log(chatThemeImage);
    const dispatch = useDispatch();

    // camera menu state
    const [cameraMenuOpen, setCameraMenuOpen] = useState(false);

    const toggleCameraMenu = (e) => {
        e.stopPropagation();
        setCameraMenuOpen((prev) => {
            return !prev;
        });
    };

    const handleDefaultClick = async () => {
        try {
            setIsSaving(true); // start shimmer
            dispatch( setChatThemeImage(import.meta.env.VITE_DEFAULT_CHAT_THEME) );
            await handleSaveProfileClick( null , null , import.meta.env.VITE_DEFAULT_CHAT_THEME , null , null );
            setIsSaving(false); // stop shimmer
        } catch (error) {
            console.error("Error removing image:", error);
        }
    }

    return (
         <div className="flex justify-center items-center h-full max-w-full mb-28 relative">
            {/* Circle Button */}
            <div
                className={`relative ${isOpen ? "w-68 h-72 md:w-96" : "w-64 h-96 md:w-96 md:h-96"} rounded-xl bg-gray-300 flex items-center justify-center 
                hover:bg-gray-400 transition-all duration-500 ease-in-out group overflow-visible`}
                style={{
                    backgroundImage: `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${chatThemeImage}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                }}
            >
                {/* User Image inside Circle */}
                {isSaving ? 
                    (
                        <div className="w-full h-full rounded-xl shimmer shadow-black shadow-lg" ></div>
                    ) 
                    : 
                    (
                        chatThemeImage.length > 0 && 
                        (
                            <div 
                                className={`rounded-xl w-full h-full transition-all duration-300 ease-in-out  overflow-y-scroll scrollbar-hidden `}
                            >
                                <div
                                    className="w-full flex justify-end pr-4 my-2 "
                                >
                                    <div className="flex flex-col items-end max-w-[70%]">
                                        <div className="bg-gray-800 shadow-white flex flex-col shadow-inner text-white px-4 py-2 rounded-lg break-words">
                                            <span className='text-sm' > Hey !! Man</span>
                                            <div className="text-xs flex items-end justify-end text-white mt-1">
                                            {new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                                <div
                                    className="w-full flex justify-start pl-4 mb-2"
                                >
                                    <div className="flex flex-col items-start max-w-[70%]">
                                        <div className="bg-gray-200 shadow-black shadow-md text-black px-4 py-2 rounded-lg break-words">
                                            <span className='text-sm' >How you doin!!!!</span>
                                            <div className="text-xs flex items-end justify-end text-black mt-1">
                                            {new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }

               


                {/* 🔧 New Circular-Aligned Camera Icon */}
                <div
                    className={`absolute ${isOpen ? "bottom-1/3 right-1/10" : "bottom-1/12 right-1/4" }  
                                translate-x-[60%] translate-y-[60%]
                                bg-gray-600 text-white rounded-full p-3 md:p-4 select-none flex items-center justify-center
                                transition-all duration-500 ease-in-out cursor-pointer shadow-black shadow-lg z-30`}
                    onClick={toggleCameraMenu}
                >
                    <i className={`material-icons transition-transform duration-500 ease-in-out
                    }`}>
                    photo_camera
                    </i>
                </div>


                {/* Floating Action Menu */}
                <div
                    className={`absolute ${isOpen ? "bottom-28 right-0 md:bottom-43 md:right-0" : "bottom-12 right-12" }  rounded-lg shadow-lg ${isOpen ? "translate-x-[-15%] translate-y-[100%] md:translate-x-[110%] md:translate-y-[96%]" : "translate-x-[21%] translate-y-[94%]" }  
                                transition-all duration-500 ease-in-out flex flex-col text-black text-sm 
                                 ${cameraMenuOpen ? "max-h-80 opacity-100 scale-100" : "max-h-0 opacity-0 scale-y-90"} `}
                >

                    <div className="px-4 py-8 flex items-center">

                    </div>

                    <div className='shadow-black shadow-sm bg-gray-600 p-1 rounded-t-lg' >
                        <button
                            className=" hover:bg-gray-300 flex p-2 font-bold text-white hover:text-black h-full rounded-lg w-full items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDefaultClick();
                                setCameraMenuOpen(false);
                            }}
                        >
                            <i className='material-icons' >monitor</i> Default Chat Theme
                        </button>
                    </div>

                    <div className='shadow-black shadow-sm bg-gray-600 p-1 rounded-b-lg' >
                        <button
                            className=" hover:bg-gray-300 flex p-2 font-bold text-white hover:text-black h-full rounded-lg w-full items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCameraMenuOpen(false);
                                setIsOpen(true);
                            }}
                        >
                            <i className='material-icons' >palette</i> Select Theme
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserImage