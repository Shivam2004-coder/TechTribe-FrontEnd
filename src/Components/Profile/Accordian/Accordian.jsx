import React from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from '../../../utils/ReduxStore/profileSlice';

const avatars = [
  "/boyAvatar1.jpg", "/boyAvatar2.jpg", "/boyAvatar3.jpg", "/boyAvatar4.jpg", "/boyAvatar5.jpg",
  "/girlAvatar1.jpg", "/girlAvatar2.jpg", "/girlAvatar3.jpg", "/girlAvatar4.jpg", "/girlAvatar5.jpg",
  "/boyAvatar6.jpg", "/boyAvatar7.jpg", "/boyAvatar8.jpg", "/boyAvatar9.jpg", "/boyAvatar10.jpg",
  "/girlAvatar6.jpg", "/girlAvatar7.jpg", "/girlAvatar8.jpg", "/girlAvatar9.jpg", "/girlAvatar10.jpg"
];

const Accordian = () => {
  const dispatch = useDispatch();

  const handleClick = (src) => {
    dispatch(setProfileImage(src));
  };

  return (
    <div className="grid grid-cols-5 h-96 p-4 bg-gray-900 rounded-lg shadow-md overflow-y-scroll">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          onClick={() => handleClick(avatar)}
          className="relative flex justify-center items-center p-1 
                     hover:bg-gray-800 rounded-full cursor-pointer"
        >
          <img
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className="object-cover rounded-full h-25 w-25 border-2 border-transparent 
                       hover:border-yellow-400 shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default Accordian;