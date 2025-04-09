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
} from "../../utils/ReduxStore/profileSlice"; // Adjust the path if needed
import axios from 'axios';
import { BASE_URL } from '../../utils/Constants/constants';
import { errorMessage } from '../../utils/ShowMessage';

const CreateAccountButton = ({ formData, images }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // Dispatching form data to Redux store
    dispatch(setFirstName(formData.firstName));
    dispatch(setLastName(formData.lastName));
    dispatch(setDateOfBirth(formData.dob));
    dispatch(setGender(formData.gender));
    dispatch(setLivingIn(formData.location));
    dispatch(setBio(formData.bio));
    dispatch(setSkills(formData.skills));
    dispatch(setUploadedImages(images.filter(Boolean))); // Only keep non-null images

    try {
      const res = await axios.patch(BASE_URL + "profile/edit" , {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        livingIn: formData.location,
        bio: formData.bio,
        skills: formData.skills,
        uploadedImages: images
      } , {withCredentials: true});
  
      console.log(res);

    } catch (error) {
      errorMessage(error.message);
    }

    // Navigate after dispatching
    navigate('/tribe');
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
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