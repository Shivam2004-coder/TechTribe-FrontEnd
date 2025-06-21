import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from '../../../utils/ReduxStore/profileSlice';
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional: Lucide icons
import UserImage from "../EditOptions/UserImage";
import UserAvatar from "../EditOptions/Options/UserAvatar";
import { BASE_URL } from "../../../utils/Constants/constants";
import axios from "axios";
import useSaveImages from "../../../CustomHooks/useSaveImages";

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
  const [isSaving, setIsSaving] = useState(false);
  const profileImage = useSelector((store) => store.profile.profileImage);
  const { handleSaveProfileClick } = useSaveImages();

  const handleClick = async (src) => {
    if (src === profileImage) {
      return; // Don't proceed if the clicked avatar is already selected
    }

    try{
      console.log("I am in Accordian delete Function !!");
      console.log("Profile Image: ", profileImage);
      setIsSaving(true);
      const response = await axios.post(BASE_URL + "profile/delete/image", {
          publicId: profileImage,
          isProfile: true,
      },{withCredentials: true});
      console.log(response);
      dispatch(setProfileImage(src));
      await handleSaveProfileClick();
      setIsSaving(false);
    }
    catch (error) {
      console.error("Error handling avatar click:", error);
    }

  };
  return (
    <div className="flex flex-col bg-amber-500 items-center max-w-full min-h-screen p-4 rounded-lg shadow-lg">
      <UserImage isOpen={isOpen}
                setIsOpen={setIsOpen}   
                isSaving={isSaving}
                setIsSaving={setIsSaving} 
      />
      <div className="w-full shadow-black rounded-lg shadow-md bg-gray-900">
        {/* Accordion Header */}
        <div
          className="flex justify-between items-center cursor-pointer bg-gray-800 text-white p-3 rounded-t-lg hover:bg-gray-700 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-lg">Avatars</span>
          <div className="flex items-center space-x-2 transition-all duration-1000 ease-in-out">
            <div
              className={`transition-all duration-500 ease-in-out transform ${
                isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
              }`}
            >
              <UserAvatar />
            </div>
            <span
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown size={20} />
            </span>
          </div>
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
              className={`relative aspect-square flex justify-center items-center 
                          m-3 p-0 rounded-full cursor-pointer transition-all duration-300
                          ${avatar === profileImage ? "cursor-not-allowed" : "hover:shadow-black hover:shadow-lg"}
                          ${avatar === profileImage ? "border-4 bg-green-600 border-green-600 shadow-green-500 shadow-lg scale-105" : ""}`}
            >

              <AdvancedImage
                cldImg={cld.image(avatar).resize(fill().width(300).height(300))}
                className={`w-full h-full md:w-[90%] md:h-[90%] object-cover rounded-full transition-all duration-300
                            ${avatar === profileImage ? "ring-4 ring-green-600" : "border-4 border-transparent hover:scale-105"}`}
              />

              {avatar === profileImage && (
                <div className="absolute bottom-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  ✓
                </div>
              )}
            </div>

          ))}
        </div>


      </div>
    </div>
  );
};

export default Accordian;