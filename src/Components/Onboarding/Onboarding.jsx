import React, { useState } from 'react';
import UploadImage from './UploadImage';
import Form from './Form';
import CreateAccountButton from './CreateAccountButton';
import { useSelector } from 'react-redux';

const Onboarding = () => {

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
    <div className="min-h-screen h-full w-full p-8 flex flex-col gap-6 text-gray-800 "    
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