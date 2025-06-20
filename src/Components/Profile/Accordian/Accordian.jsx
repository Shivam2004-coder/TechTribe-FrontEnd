import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from '../../../utils/ReduxStore/profileSlice';
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional: Lucide icons
import UserImage from "../EditOptions/UserImage";

const avatars = [
  "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_a83fe293-40ae-458d-8423-83bfec78dbbb", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_424fc5f1-b325-4461-bac7-749391c70640", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_b833471e-8f1b-4fc7-82b0-caec4f8f7fee", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_1f1c6672-b72b-4fab-8a79-157cf8c6ba64", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_0428dab3-deaa-406c-bb8d-3668b7254f5c",
  "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_67c7b66f-a0ea-4d3d-83de-b82b60bb3a6a", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_2c0a0add-4ac5-4d5f-8d3d-8e20f65e8843", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_3768c636-04a3-4b48-ba94-7d5a8c509215", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_a4ff64eb-c36a-4684-9f83-0f20799d01ab", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_6a4beb85-460e-4b2a-b497-90d3e0373e9b",
  "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_e52def3d-88f5-40b1-af92-2d31433a2470", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_4b337dcf-585b-4ea0-b042-120ba44797a3", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_3fe8eb1e-53f4-4577-892d-e05a8ca7a1b3", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_b5e6fc47-4a17-4e1d-895c-7a267c3bf0d8", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_3ff93015-921c-4d0f-b91c-e9b7ac8d6075",
  "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_f1fa0783-1d0a-4b2b-a06b-dae8f8630d30", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_4b403519-a155-44b1-a661-5782fb3131f2", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_8bce3b20-1027-4453-b192-8d11d9b9e28b", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_702fc626-627a-41ad-b9b3-e2198d16a68f", "TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_4c0cf563-3ad3-4736-9078-b68204a3b985"
];

const Accordian = () => {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
      cloud: {
          cloudName: 'dilpkrfrb'
      }
  });

  const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState(false);

  const handleClick = (src) => {
    dispatch(setProfileImage(src));
  };
  return (
    <div className="flex flex-col bg-amber-500 items-center max-w-full min-h-screen p-4 rounded-lg shadow-lg">
      <UserImage isOpen={isOpen}
                setIsOpen={setIsOpen}    
      />
      <div className="w-full">
        {/* Accordion Header */}
        <div
          className="flex justify-between items-center cursor-pointer bg-gray-800 text-white p-3 rounded-t-lg hover:bg-gray-700 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-lg">Avatars</span>
          <span
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={20} />
          </span>
        </div>

        <div
          className={`grid 
                      grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                      gap-2 bg-gray-900 rounded-b-lg shadow-md
                      transition-all duration-500 ease-in-out overflow-y-auto
                      ${isOpen ? "max-h-[30rem] opacity-100 scale-100" : "max-h-0 opacity-0 scale-90"}
          `}
          style={{ transitionProperty: "all" }}
        >
          {avatars.map((avatar, index) => (
            <div
              key={index}
              onClick={() => handleClick(avatar)}
              className="relative aspect-square flex justify-center items-center 
                        p-2 rounded-full cursor-pointer hover:shadow-black hover:shadow-lg transition-shadow duration-300"
            >
              <AdvancedImage
                cldImg={cld.image(avatar).resize(fill().width(300).height(300))}
                className="w-full h-full md:w-[90%] md:h-[90%] object-cover border-4 border-transparent 
                          shadow-lg rounded-full hover:scale-105"
              />
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Accordian;


{/* <div className="grid grid-cols-5 h-96 p-4 bg-gray-900 rounded-lg shadow-md overflow-y-scroll">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            onClick={() => handleClick(avatar)}
            className="relative flex justify-center items-center p-1 
                      hover:bg-gray-800 rounded-full cursor-pointer"
          >
            <div className="h-25 w-25 object-cover border-2 border-transparent 
                        hover:border-yellow-400 shadow-lg rounded-lg" >
                <AdvancedImage cldImg={cld.image(avatar).resize(fill().width(200).height(200))} />
            </div>
          </div>
        ))}
      </div> */}