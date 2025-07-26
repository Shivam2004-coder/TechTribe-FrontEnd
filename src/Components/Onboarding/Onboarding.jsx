import React, { useState } from 'react';
import UploadImage from './UploadImage';
import Form from './Form';
import CreateAccountButton from './CreateAccountButton';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {

  const gender = useSelector((store) => store.profile.gender);
  const navigate = useNavigate();

  useEffect(() => {
    if (gender && gender.length > 0) {
      navigate('/tribe');
    }
  }, [gender,navigate]);

  const firstName = useSelector((store) => store.profile.firstName);
  const lastName = useSelector((store) => store.profile.lastName);

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    dob: "",
    gender: "",
    location: "",
    bio: "",
    skills: [],
    inputSkill: "",
  });

  const [images, setImages] = useState([]);

  return (
    <div className="min-h-screen h-full p-4 md:justify-center  flex flex-col gap-6 backdrop-blur-lg bg-white/50 w-[80%] text-gray-800 "    
    >
        {/* <div className="flex" >
            <div className="text-2xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 shadow shadow-black">
                Welcome To Tech Tribe
            </div>
        </div> */}
        <Form formData={formData} 
              setFormData={setFormData} 
              images={images}
              setImages={setImages}
        />
        <CreateAccountButton formData={formData} images={images} />
    </div>
  );
};

export default Onboarding;