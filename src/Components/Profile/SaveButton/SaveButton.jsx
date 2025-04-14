import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../../utils/Constants/constants';
import { errorMessage } from '../../../utils/ShowMessage';

const SaveButton = () => {
    const firstName = useSelector((store) => store.profile.firstName);
    const lastName = useSelector((store) => store.profile.lastName);
    const emailId = useSelector((store) => store.profile.emailId);
    const gender = useSelector((store) => store.profile.gender);
    const dateOfBirth = useSelector((store) => store.profile.dateOfBirth);
    const promptContent = useSelector((store) => store.profile.promptContent);
    const uploadedImages = useSelector((store) => store.profile.uploadedImages);
    const profileImage = useSelector((store) => store.profile.profileImage);
    const bio = useSelector((store) => store.profile.bio);
    const jobTitle = useSelector((store) => store.profile.jobTitle);
    const companyName = useSelector((store) => store.profile.companyName);
    const school = useSelector((store) => store.profile.school);
    const livingIn = useSelector((store) => store.profile.livingIn);
    const socialLinks = useSelector((store) => store.profile.socialLinks);
    const skills = useSelector((store) => store.profile.skills);


    // console.log(firstName);
    // console.log(lastName);
    // console.log(emailId);
    // console.log(gender);
    // console.log(dateOfBirth);
    // console.log(promptContent);
    // console.log(uploadedImages);
    console.log(profileImage);
    // console.log(bio);
    // console.log(jobTitle);
    // console.log(companyName);
    // console.log(school);
    // console.log(livingIn);
    // console.log(socialLinks);
    // console.log(skills);

    const handleSaveProfileClick = async () => {
        try {
            console.log("I am in delete Function !!");

            const response = await axios.post(BASE_URL + "profile/delete/savedImages", {
                uploadedImages,
                profileImage,
            },{withCredentials: true});

            console.log(response);

            const res = await axios.patch(BASE_URL + "profile/edit" , {
              firstName,
              lastName,
              emailId,
              gender,
              dateOfBirth,
              promptContent,
              uploadedImages,
              profileImage,
              bio,
              jobTitle,
              companyName,
              school,
              livingIn,
              socialLinks,
              skills,
            } , {withCredentials: true});
        
            console.log(res);
      
          } catch (error) {
            errorMessage(error.message);
          }    
    }

    return (
        <div className="flex justify-center items-center h-20 w-full" >
            <button className="rounded-xl bg-green-500 p-4" 
                    onClick={handleSaveProfileClick}
            >
                Save Profile
            </button>   
        </div>
    )
}

export default SaveButton