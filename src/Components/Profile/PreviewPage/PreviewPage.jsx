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
  const uploadedImages = useSelector((store) => store.profile.uploadedImages);
  const bio = useSelector((store) => store.profile.bio);
  const jobTitle = useSelector((store) => store.profile.jobTitle);
  const companyName = useSelector((store) => store.profile.companyName);
  const school = useSelector((store) => store.profile.school);
  const livingIn = useSelector((store) => store.profile.livingIn);
  const skills = useSelector((store) => store.profile.skills);
  const socialLinks = useSelector((store) => store.socialLinks);

  const userFeed = {
    firstName,
    lastName,
    emailId,
    gender,
    dateOfBirth,
    promptContent,  
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
    <div className="flex-grow flex w-full justify-center bg-amber-500 rounded-lg" >
      <div className="col-span-4 flex flex-grow justify-center" >
        <UserCard
          feed={userFeed}
        />
      </div>
    </div>
  )
}

export default PreviewPage