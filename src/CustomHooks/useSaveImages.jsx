import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/Constants/constants';
import { errorMessage } from '../utils/ShowMessage';

const useSaveImages = () => {

    const userFirstName = useSelector((store) => store.profile.firstName);
    const userLastName = useSelector((store) => store.profile.lastName);
    const userEmailId = useSelector((store) => store.profile.emailId);
    const userGender = useSelector((store) => store.profile.gender);
    const userDateOfBirth = useSelector((store) => store.profile.dateOfBirth);
    const userPromptContent = useSelector((store) => store.profile.promptContent);
    const userUploadedImages = useSelector((store) => store.profile.uploadedImages);
    const profileImage = useSelector((store) => store.profile.profileImage);
    const userBio = useSelector((store) => store.profile.bio);
    const userJobTitleName = useSelector((store) => store.profile.jobTitle);
    const userCompanyName = useSelector((store) => store.profile.companyName);
    const userSchool = useSelector((store) => store.profile.school);
    const userLivingIn = useSelector((store) => store.profile.livingIn);
    const userSocialLinks = useSelector((store) => store.profile.socialLinks);
    const userSkills = useSelector((store) => store.profile.skills);

    const handleSaveProfileClick = async () => {
        try {

            console.log("Saving profile with the following data:");
            console.log("Profile Image: ", profileImage);
            const res = await axios.patch(BASE_URL + "profile/edit", {
                firstName: userFirstName,
                lastName: userLastName,
                emailId: userEmailId,
                gender: userGender,
                dateOfBirth: userDateOfBirth,
                promptContent: userPromptContent,
                uploadedImages: userUploadedImages.filter(Boolean),
                profileImage: profileImage,
                bio: userBio,
                jobTitle: userJobTitleName,
                companyName: userCompanyName,
                school: userSchool,
                livingIn: userLivingIn,
                socialLinks: userSocialLinks,
                skills: userSkills,
            }, { withCredentials: true });

        
            console.log(res);
      
        } 
        catch (error) {
            errorMessage(error.message);
        }  
    }

    return {
        handleSaveProfileClick
    }
}

export default useSaveImages