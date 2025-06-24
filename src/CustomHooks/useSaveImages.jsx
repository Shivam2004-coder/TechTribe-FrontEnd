import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/Constants/constants';
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

            console.log( "finalProfileImage : "+finalProfileImage );
            console.log( "finalUploadedImages : "+finalUploadedImages );
            console.log( "finalChatThemeImage : "+finalChatThemeImage );
            console.log( "finalWallpaperImage : "+finalWallpaperImage );
            console.log( "finalDisplayMode : "+finalDisplayMode );
            


            const res = await axios.patch(
                BASE_URL + 'profile/edit',
                {
                    uploadedImages: finalUploadedImages?.filter(Boolean) || [],
                    profileImage: finalProfileImage,
                    chatThemeImage: finalChatThemeImage,
                    wallpaperImage: finalWallpaperImage,
                    displayMode: finalDisplayMode
                },
                { withCredentials: true }
            );
            console.log('Profile updated:', res);
        } catch (error) {
            errorMessage(error.message);
        }
    };

    return { handleSaveProfileClick };
};

export default useSaveImages;






















// import axios from 'axios';
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { BASE_URL } from '../utils/Constants/constants';
// import { errorMessage } from '../utils/ShowMessage';

// const useSaveImages = () => {

//     const userFirstName = useSelector((store) => store.profile.firstName);
//     const userLastName = useSelector((store) => store.profile.lastName);
//     const userEmailId = useSelector((store) => store.profile.emailId);
//     const userGender = useSelector((store) => store.profile.gender);
//     const userDateOfBirth = useSelector((store) => store.profile.dateOfBirth);
//     const userPromptContent = useSelector((store) => store.profile.promptContent);
//     const userUploadedImages = useSelector((store) => store.profile.uploadedImages);
//     const profileImage = useSelector((store) => store.profile.profileImage);
//     const userBio = useSelector((store) => store.profile.bio);
//     const userJobTitleName = useSelector((store) => store.profile.jobTitle);
//     const userCompanyName = useSelector((store) => store.profile.companyName);
//     const userSchool = useSelector((store) => store.profile.school);
//     const userLivingIn = useSelector((store) => store.profile.livingIn);
//     const userSocialLinks = useSelector((store) => store.profile.socialLinks);
//     const userSkills = useSelector((store) => store.profile.skills);
//     const userChatThemeImage = useSelector((store) => store.profile.chatThemeImage);
//     const userWallpaperImage = useSelector((store) => store.profile.wallpaperImage);
//     const userDisplayMode = useSelector((store) => store.profile.displayMode);

//     const handleSaveProfileClick = async ( latestProfileImage , uploadedImages , chatThemeImage , wallpaperImage , displayMode ) => {
//         try {

//             console.log("Saving profile with the following data:");
//             console.log("Profile Image: ", profileImage);
//             const res = await axios.patch(BASE_URL + "profile/edit", {
//                 firstName: userFirstName,
//                 lastName: userLastName,
//                 emailId: userEmailId,
//                 gender: userGender,
//                 dateOfBirth: userDateOfBirth,
//                 promptContent: userPromptContent,

                
//                 // uploadedImages: isProfile ? userUploadedImages.filter(Boolean) : uploadedImages.filter(Boolean),
//                 uploadedImages: isProfile ? userUploadedImages?.filter(Boolean) || [] : uploadedImages?.filter(Boolean) || [],
//                 profileImage: isProfile ? latestProfileImage : profileImage ,
//                 // profileImage: isProfile ? latestProfileImage : profileImage ,
//                 bio: userBio,
//                 jobTitle: userJobTitleName,
//                 companyName: userCompanyName,
//                 school: userSchool,
//                 livingIn: userLivingIn,
//                 socialLinks: userSocialLinks,
//                 skills: userSkills,
//             }, { withCredentials: true });

        
//             console.log(res);
      
//         } 
//         catch (error) {
//             errorMessage(error.message);
//         }  
//     }

//     return {
//         handleSaveProfileClick
//     }
// }

// export default useSaveImages