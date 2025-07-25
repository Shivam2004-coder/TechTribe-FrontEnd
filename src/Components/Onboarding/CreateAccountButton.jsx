import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setFirstName,
  setLastName,
  setDateOfBirth,
  setGender,
  setLivingIn,
  setBio,
  setSkills,
  setUploadedImages,
  setProfileImage,
  setPromptUserContent,
  setCompanyName,
  setJobTitle,
  setSchool,
  setGithubLink,
  setLinkedinLink,
  setPortfolioLink,
  setMembershipType,
  setSwipes,
  setChatThemeImage,
  setWallpaperImage,
  setDisplayMode,
} from "../../utils/ReduxStore/profileSlice"; // Adjust the path if needed
import axios from 'axios';
import { errorMessage } from '../../utils/ShowMessage';

const CreateAccountButton = ({ formData, images }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const requiredFields = [
      { key: 'firstName', label: 'First name' },
      { key: 'lastName', label: 'Last name' },
      { key: 'dob', label: 'Date of birth' },
      { key: 'gender', label: 'Gender' },
      { key: 'location', label: 'Location' },
      { key: 'bio', label: 'Bio' },
      { key: 'skills', label: 'Skills' },
    ];

    // Check for first missing field
    for (let field of requiredFields) {
      const value = formData[field.key];
      console.log(value);
      if (!value || value.toString().trim() === '') {
        if (field.key === 'dob') {
          errorMessage("Please enter a valid date of birth");
          return;
        }
        errorMessage(`${field.label} should not be empty`);
        return;
      }

      // Extra check: validate date format if field is dob
      if (field.key === 'dob') {
        const date = new Date(value);
        const isValidDate = !isNaN(date.getTime());

        if (!isValidDate) {
          errorMessage("Please enter a valid date of birth");
          return;
        }

        // ✅ New check: date should not be in the future
        const today = new Date();
        // clear time part for today
        today.setHours(0, 0, 0, 0);

        if (date > today) {
          errorMessage("Date of birth cannot be in the future");
          return;
        }

      }
    }

    // Check if at least two images are uploaded
    const validImages = images.filter(Boolean);
    if (validImages.length < 2) {
      errorMessage("Please upload at least two images");
      return;
    }

    // Dispatching form data to Redux store
    dispatch(setFirstName(formData.firstName));
    dispatch(setLastName(formData.lastName));
    dispatch(setDateOfBirth(formData.dob));
    dispatch(setGender(formData.gender));
    dispatch(setLivingIn(formData.location));
    dispatch(setBio(formData.bio));
    dispatch(setSkills(formData.skills));
    dispatch(setUploadedImages(validImages));

    try {
      const res = await axios.patch(
        import.meta.env.VITE_BASE_URL + "profile/edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dob,
          gender: formData.gender,
          livingIn: formData.location,
          bio: formData.bio,
          skills: formData.skills,
          uploadedImages: validImages,
        },
        { withCredentials: true }
      );

      const updatedUser = res.data.data;

      // Dispatch all fields to Redux
      dispatch(setFirstName(updatedUser.firstName));
      dispatch(setLastName(updatedUser.lastName));
      dispatch(setDateOfBirth(updatedUser.dateOfBirth));
      dispatch(setGender(updatedUser.gender));
      dispatch(setLivingIn(updatedUser.livingIn));
      dispatch(setBio(updatedUser.bio));
      dispatch(setSkills(updatedUser.skills));
      dispatch(setUploadedImages(updatedUser.uploadedImages));
      dispatch(setProfileImage(updatedUser.profileImage)); // if profile image is handled
      dispatch(setPromptUserContent(updatedUser.promptContent)); // optional
      dispatch(setCompanyName(updatedUser.companyName));
      dispatch(setJobTitle(updatedUser.jobTitle));
      dispatch(setSchool(updatedUser.school));
      dispatch(setGithubLink(updatedUser.socialLinks?.github || ''));
      dispatch(setLinkedinLink(updatedUser.socialLinks?.linkedin || ''));
      dispatch(setPortfolioLink(updatedUser.socialLinks?.portfolio || ''));
      dispatch(setMembershipType(updatedUser.membershipType || ''));
      dispatch(setSwipes(updatedUser.swipes || ''));
      dispatch(setChatThemeImage(updatedUser.chatThemeImage || ''));
      dispatch(setWallpaperImage(updatedUser.wallpaperImage || ''));
      dispatch(setDisplayMode(updatedUser.displayMode || ''));

      // console.log(res);
      navigate('/tribe');
    } catch (error) {
      errorMessage(error.message);
    }
  };


  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white p-10 rounded-lg hover:shadow-black hover:shadow-lg hover:rounded-full text-lg font-semibold hover:bg-green-700 cursor-pointer" 
      >
        CREATE ACCOUNT
      </button>
    </div>
  );
};

export default CreateAccountButton;









// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const CreateAccountButton = ({ formData, images }) => {

//   const navigate = useNavigate();
//   console.log(formData);
//   console.log(images);
//   const handleSubmit = () => {
//       // You can send data to backend here before navigating
//       navigate("/tribe");
//   };

//   return (
//     <div className="flex justify-center mt-6">
//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
//         >
//           CREATE ACCOUNT
//         </button>
//     </div>
//   )
// }

// export default CreateAccountButton