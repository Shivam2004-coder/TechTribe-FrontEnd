import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { errorMessage } from '../utils/ShowMessage';

const useSaveImages = () => {
    const {
        uploadedImages: storedUploadedImages,
        profileImage: storedProfileImage,
        chatThemeImage: storedChatThemeImage,
        wallpaperImage: storedWallpaperImage,
        displayMode: storedDisplayMode
    } = useSelector((store) => store.profile);

    const handleSaveProfileClick = async (
        latestProfileImage,
        uploadedImages,
        chatThemeImage,
        wallpaperImage,
        displayMode
    ) => {
        try {
            // Dynamically determine the new values
            const finalProfileImage = latestProfileImage ?? storedProfileImage;
            const finalUploadedImages = uploadedImages ?? storedUploadedImages;
            const finalChatThemeImage = chatThemeImage ?? storedChatThemeImage;
            const finalWallpaperImage = wallpaperImage ?? storedWallpaperImage;
            const finalDisplayMode = displayMode ?? storedDisplayMode;

            // console.log( "finalProfileImage : "+finalProfileImage );
            // console.log( "finalUploadedImages : "+finalUploadedImages );
            // console.log( "finalChatThemeImage : "+finalChatThemeImage );
            // console.log( "finalWallpaperImage : "+finalWallpaperImage );
            // console.log( "finalDisplayMode : "+finalDisplayMode );
            


            const res = await axios.patch(
                import.meta.env.VITE_BASE_URL + 'profile/edit',
                {
                    uploadedImages: finalUploadedImages?.filter(Boolean) || [],
                    profileImage: finalProfileImage,
                    chatThemeImage: finalChatThemeImage,
                    wallpaperImage: finalWallpaperImage,
                    displayMode: finalDisplayMode
                },
                { withCredentials: true }
            );
            // console.log('Profile updated:', res);
        } catch (error) {
            errorMessage(error.message);
        }
    };

    return { handleSaveProfileClick };
};

export default useSaveImages;