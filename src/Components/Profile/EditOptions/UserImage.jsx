import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../../utils/ReduxStore/profileSlice';
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import axios from 'axios';
import useSaveImages from '../../../CustomHooks/useSaveImages';
import { errorMessage } from '../../../utils/ShowMessage';

const UserImage = (props) => {

    const { isOpen, setIsOpen , isSaving , setIsSaving } = props;

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const avatars = import.meta.env.VITE_AVATARS?.split(",") || [];

    const { handleSaveProfileClick } = useSaveImages();
    const profileImage = useSelector((store) => store.profile.profileImage);
    console.log("i am in the UserImage.");
    console.log(profileImage);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    // Function to open file picker
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const previewFiles = (file) => {
        try{
            setIsSaving(true);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                console.log("I am in delete Function !!");
                if( profileImage !== import.meta.env.VITE_DEFAULT_AVATAR && !avatars.includes(profileImage) ){
                    const response = await axios.post(import.meta.env.VITE_BASE_URL + "profile/delete/image", {
                        publicId: profileImage ,
                        isProfile: true,
                    },{withCredentials: true});

                    console.log(response);
                }

                const uImg = reader.result;
                const CloudinaryImages = await axios.post(import.meta.env.VITE_BASE_URL + "profile/upload/image" , {
                    image: uImg, 
                    isProfile: true,
                } , {withCredentials: true});

                console.log("CloudinaryImage : ");
                console.log(CloudinaryImages);

                dispatch(setProfileImage(CloudinaryImages?.data?.uploadResult?.public_id));
                await handleSaveProfileClick( CloudinaryImages?.data?.uploadResult?.public_id, null , null , null , null ); // Save the changes to the profile
                setIsSaving(false); // stop shimmer
            }
        }
        catch (error) {
            console.error("Error previewing files:", error);
            errorMessage("Failed to upload an image !!");
        }
    }

    // Function to handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (!file) return;
        // setFile(file);
        previewFiles(file);
    };


    // camera menu state
    const [cameraMenuOpen, setCameraMenuOpen] = useState(false);

    const toggleCameraMenu = (e) => {
        e.stopPropagation();
        setCameraMenuOpen((prev) => {
            return !prev;
        });
    };

    const handleRemoveImage = async (e) => {
        e.stopPropagation();
        try {
            setIsSaving(true); // start shimmer
            // Call API to delete the image
            if( profileImage !== import.meta.env.VITE_DEFAULT_AVATAR && !avatars.includes(profileImage) ){
                const response = await axios.post(import.meta.env.VITE_BASE_URL + "profile/delete/image", {
                    publicId: profileImage,
                    isProfile: true,
                }, { withCredentials: true });
                console.log(response);
            }
            dispatch(setProfileImage(import.meta.env.VITE_DEFAULT_AVATAR)); // Reset to default image
            await handleSaveProfileClick( import.meta.env.VITE_DEFAULT_AVATAR, null , null , null , null ); // Save the changes to the profile
            setIsSaving(false); // stop shimmer

        } catch (error) {
            console.error("Error removing image:", error);
            errorMessage("Failed to delete and image!!");
        }
    }

    return (
         <div className="flex justify-center items-center h-full max-w-full mb-28 relative">
            {/* Circle Button */}
            <div
                className={`relative ${isOpen ? "w-36 h-36" : "w-52 h-52 md:w-96 md:h-96"} rounded-full bg-gray-300 flex items-center justify-center 
                hover:bg-gray-400 transition-all duration-500 ease-in-out group overflow-visible`}
            >
                {/* User Image inside Circle */}
                {isSaving ? (
                <div className="w-full h-full rounded-full shimmer shadow-black shadow-lg" ></div>
                // <div className="absolute inset-0 shimmer rounded-lg"></div>
                ) : (
                profileImage.length > 0 && (
                    <AdvancedImage
                        cldImg={cld.image(profileImage).resize(fill().width(250).height(250))}
                        className="object-cover w-full h-full rounded-full shadow-black shadow-lg"
                    />)
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
                                handleRemoveImage(e);
                                setCameraMenuOpen(false);
                            }}
                        >
                            <i className='material-icons' >delete</i> Remove Image
                        </button>
                    </div>

                    <div className='shadow-black shadow-sm bg-gray-600 p-1 ' >
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <button
                            className=" hover:bg-gray-300 flex p-2 font-bold text-white hover:text-black h-full rounded-lg w-full items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFileUpload();
                                setCameraMenuOpen(false);
                            }}
                        >
                            <i className='material-icons' >image</i> Choose Image
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
                            <i className='material-icons' >face_6</i> Select Avatar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserImage