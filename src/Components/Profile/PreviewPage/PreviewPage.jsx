import React from 'react'
import { useSelector } from 'react-redux';
import UserCard from '../../Tribe/UserCard';

const PreviewPage = () => {

  const firstName = useSelector((store) => store.profile.firstName);
  const lastName = useSelector((store) => store.profile.lastName);
  const emailId = useSelector((store) => store.profile.emailId);
  const gender = useSelector((store) => store.profile.gender);
  const dateOfBirth = useSelector((store) => store.profile.dateOfBirth);
  const promptContent = useSelector((store) => store.profile.promptContent);
  const profileImage = useSelector((store) => store.profile.profileImage);
  const uploadedImages = useSelector((store) => store.profile.uploadedImages);
  const bio = useSelector((store) => store.profile.bio);
  const jobTitle = useSelector((store) => store.profile.jobTitle);
  const companyName = useSelector((store) => store.profile.companyName);
  const school = useSelector((store) => store.profile.school);
  const livingIn = useSelector((store) => store.profile.livingIn);
  const skills = useSelector((store) => store.profile.skills);
  const socialLinks = useSelector((store) => store.socialLinks);

  const userFeed = {
    _id:"",
    firstName,
    lastName,
    emailId,
    gender,
    dateOfBirth,
    promptContent,  
    profileImage,
    uploadedImages,
    bio,
    jobTitle,
    companyName,
    school,
    livingIn,
    skills,
    socialLinks
  };

  return (
    <div className="flex w-full h-full justify-end md:justify-center items-center bg-amber-500 rounded-lg" >
      <div className="justify-center" >
        <UserCard
          feed={userFeed}
          isProfile={true}
        />
      </div>
    </div>
  )
}

export default PreviewPage