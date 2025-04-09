// useFetchUserProfileData.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants/constants';
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
  setPortfolioLink
} from '../utils/ReduxStore/profileSlice';

const useFetchUserProfileData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = useSelector((store) => store.profile);

  console.log("Hi i am in useFetchUserProfileData !!");

  const isProfileEmpty = () => {
    return !profile || !profile.emailId;
  };

  const fetchUserProfileData = async () => {
    try {
      if (isProfileEmpty()) {
        const response = await axios.get(BASE_URL + 'profile/view', { withCredentials: true });
        const data = response.data;

        // Dispatch to profileSlice
        dispatch(setFirstName(data.firstName || ''));
        dispatch(setLastName(data.lastName || ''));
        dispatch(setEmailId(data.emailId || ''));
        dispatch(setGender(data.gender || ''));
        dispatch(setDateOfBirth(data.dateOfBirth || ''));
        dispatch(setPromptUserContent(data.promptContent || []));
        dispatch(setUploadedImages(data.uploadedImages || []));
        dispatch(setProfileImage(data.profileImage || '/user-profile-icon.jpg'));
        dispatch(setBio(data.bio || ''));
        dispatch(setJobTitle(data.jobTitle || ''));
        dispatch(setCompanyName(data.companyName || ''));
        dispatch(setSchool(data.school || ''));
        dispatch(setLivingIn(data.livingIn || ''));
        dispatch(setSkills(data.skills || []));
        dispatch(setGithubLink(data.socialLinks?.github || ''));
        dispatch(setLinkedinLink(data.socialLinks?.linkedin || ''));
        dispatch(setPortfolioLink(data.socialLinks?.portfolio || ''));

        console.log("Hi i have fetched and updated the redux store !!! ");
        
      }

      if (location.pathname === '/login') {
        navigate('/tribe');
      } else {
        navigate('/tribe');
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else {
        errorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);
};

export default useFetchUserProfileData;










// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/Constants/constants';
// import { addUser } from '../utils/ReduxStore/userSlice';
// import { errorMessage } from '../utils/ShowMessage';

// const useFetchUserProfileData = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const user = useSelector((store) => store.user.userContent);

//     const fetchUserProfileData = async () => {
//         try {
//             if ( !user ) {
//                 const response = await axios.get(BASE_URL + "profile/view" , {withCredentials: true});
//                 dispatch(addUser(response.data));
//             }
//             if ( location.pathname === "/login" ) {
//             //     navigate("/tribe");
//             }
//             navigate("/tribe");
//         } catch (error) {
//             if ( error?.response?.status === 401 ) {
//                 navigate("/login");
//             }
//             else{
//                 errorMessage(error.message);
//             }
//         }
//     }

//     useEffect(() => {
//         fetchUserProfileData()
//     }, []); // ✅ Dependency array
// }

// export default useFetchUserProfileData