// useFetchUserProfileData.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { errorMessage } from '../utils/ShowMessage';
import {
  setFirstName,
  setLastName,
  setEmailId,
  setGender,
  setDateOfBirth,
  setPromptUserContent,
  setUploadedImages,
  setProfileImage,
  setBio,
  setJobTitle,
  setCompanyName,
  setSchool,
  setLivingIn,
  setSkills,
  setGithubLink,
  setLinkedinLink,
  setPortfolioLink,
  setUserId,
  setMembershipType,
  setSwipes,
  setChatThemeImage,
  setWallpaperImage,
  setDisplayMode,
  setProfileLoaded,
} from '../utils/ReduxStore/profileSlice';

const useFetchUserProfileData = () => {
  const dispatch = useDispatch();


  const fetchUserProfileData = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + 'profile/view', { withCredentials: true });
        const data = response.data.user;
        console.log("i am in a useFetchData Page !!");
        console.log(data);

        // Dispatch to profileSlice
        dispatch(setUserId(data._id || ''));
        dispatch(setFirstName(data.firstName || ''));
        dispatch(setLastName(data.lastName || ''));
        dispatch(setEmailId(data.emailId || ''));
        dispatch(setGender(data.gender || ''));
        dispatch(setDateOfBirth(data.dateOfBirth || ''));
        dispatch(setPromptUserContent(data.promptContent || []));
        dispatch(setUploadedImages(data.uploadedImages || []));
        dispatch(setProfileImage(data.profileImage || ''));
        dispatch(setBio(data.bio || ''));
        dispatch(setJobTitle(data.jobTitle || ''));
        dispatch(setCompanyName(data.companyName || ''));
        dispatch(setSchool(data.school || ''));
        dispatch(setLivingIn(data.livingIn || ''));
        dispatch(setSkills(data.skills || []));
        dispatch(setGithubLink(data.socialLinks?.github || ''));
        dispatch(setLinkedinLink(data.socialLinks?.linkedin || ''));
        dispatch(setPortfolioLink(data.socialLinks?.portfolio || ''));
        dispatch(setMembershipType(data.membershipType || ''));
        dispatch(setSwipes(data.swipes || ''));
        dispatch(setChatThemeImage(data.chatThemeImage || ''));
        dispatch(setWallpaperImage(data.wallpaperImage || ''));
        dispatch(setDisplayMode(data.displayMode || ''));
        dispatch(setProfileLoaded(true));

    }
    catch (error) {
      errorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);
};

export default useFetchUserProfileData;