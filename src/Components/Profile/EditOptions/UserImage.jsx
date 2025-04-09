import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../../utils/ReduxStore/profileSlice';

const UserImage = () => {

    const profileImage = useSelector((store) => store.profile.profileImage);
    console.log(profileImage);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    // Function to open file picker
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const previewFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(setProfileImage(reader.result));
        }
    }

    // Function to handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        // setFile(file);
        previewFiles(file);
    };

    return (
        <div className="flex justify-center items-center h-full">
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/png , image/jpeg , image/jpg"
                className="hidden"
                onChange={handleFileChange} // Handle file selection
            />

            {/* Circle Button */}
            <div 
                className="relative w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center 
                hover:bg-gray-400 transition-all cursor-pointer group overflow-hidden"
                onClick={handleFileUpload}
            >
                {/* User Image inside Circle */}

                {/* {   loading ? 
                    "🔁" : */}
                    
                    <img 
                        src={profileImage} 
                        alt="userIcon" 
                        className="w-full h-full object-cover rounded-full"
                    />
                {/* } */}

                {/* Blur effect on hover */}
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>

                {/* Pen Icon (Appears on hover) */}
                <p className="absolute font-bold text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity">🖊</p>
            </div>
        </div>
    )
}

export default UserImage