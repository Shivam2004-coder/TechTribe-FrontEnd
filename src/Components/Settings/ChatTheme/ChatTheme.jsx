import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatThemeImage } from '../../../utils/ReduxStore/profileSlice';
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional: Lucide icons
import UserImage from "./UserImage";
import UserAvatar from "./UserAvatar";
import useSaveImages from "../../../CustomHooks/useSaveImages";

const ChatTheme = () => {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
      cloud: {
          cloudName: 'dilpkrfrb'
      }
  });

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const chatThemeImage = useSelector((store) => store.profile.chatThemeImage);
  const { handleSaveProfileClick } = useSaveImages();

  const handleClick = async (src) => {
    if (src === chatThemeImage) {
      console.log("Here the src and profileImage are the same");
      console.log(chatThemeImage);
      console.log(src);
      return; // Don't proceed if the clicked avatar is already selected
    }

    try{
      console.log("I am in Accordian delete Function !!");
      console.log("Profile Image: ", chatThemeImage);
      setIsSaving(true);
      dispatch(setChatThemeImage(src));
      await handleSaveProfileClick(null , null , src , null , null);
      setIsSaving(false);
    }
    catch (error) {
      console.error("Error handling avatar click:", error);
    }

  };


  const themes = import.meta.env.VITE_THEMES?.split(',') || [];

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 rounded-lg">
      <div className=" flex items-center font-bold justify-start bg-black p-4 shadow-white shadow-inner" >
        <p>Chat Themes</p>
      </div>
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
          <span className="font-semibold text-lg">Chat Themes</span>
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
          {import.meta.env.VITE_THEMES.map((avatar, index) => (
            <div
              key={index}
              onClick={() => handleClick(avatar)}
              className={`relative aspect-square flex justify-center items-center 
                          m-3 p-0 rounded-full cursor-pointer transition-all duration-300
                          ${avatar === chatThemeImage ? "cursor-not-allowed" : "hover:shadow-black hover:shadow-lg"}
                          ${avatar === chatThemeImage ? "border-4 bg-green-600 border-green-600 shadow-green-500 shadow-lg scale-105" : ""}`}
            >

              <AdvancedImage
                cldImg={cld.image(avatar).resize(fill().width(300).height(300))}
                className={`w-full h-full md:w-[90%] md:h-[90%] object-cover rounded-full transition-all duration-300
                            ${avatar === chatThemeImage ? "ring-4 ring-green-600" : "border-4 border-transparent hover:scale-105"}`}
              />

              {avatar === chatThemeImage && (
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

export default ChatTheme;