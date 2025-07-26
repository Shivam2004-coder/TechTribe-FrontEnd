// Connections.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { errorMessage } from "../../utils/ShowMessage";
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../../utils/ReduxStore/connectionSlice';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import RejectButton from './RejectButton';
import ChatButton from './ChatButton';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Lottie from "lottie-react";
import emptyBoxAnimation from "../../assets/Empty Box.json"; // adjust path if needed


const Connections = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dilpkrfrb'
    }
  });

  const connections = useSelector((store) => store.connections.connectionContent);
  const displayMode = useSelector((store) => store.profile.displayMode);
  const dispatch = useDispatch();
  const [layout, setLayout] = useState('grid');

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Utility to truncate plain strings
  const truncateText = (text, maxLen) => {
    if (!text) return "";
    return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
  };

  // Utility to truncate skills array with 32 total characters
  const truncateSkills = (skills, maxLen = 32) => {
    if (!skills || skills.length === 0) return [];
    let totalLen = 0;
    const output = [];
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      if (totalLen + skill.length <= maxLen) {
        output.push(skill);
        totalLen += skill.length;
      } else {
        // skill would overflow
        const remaining = maxLen - totalLen;
        if (remaining > 0) {
          output.push(skill.slice(0, remaining) + "...");
        }
        break;
      }
    }
    return output;
  };


  const fetchConnectionsData = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "user/requests/connections", {
        withCredentials: true
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      errorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchConnectionsData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center ">
        {/* <div className="min-h-screen w-full bg-gray-50 transition-all duration-500"> */}
        <div className="shadow-md py-6 mb-8 flex flex-col md:w-[80%] items-center rounded-2xl bg-black/60">
            <h1 className="text-center text-5xl mb-3 font-bold text-white tracking-wide">Connections</h1>
            
            <div className="relative bg-gray-300 rounded-full p-1 flex items-center w-[80px] md:w-[90px] shadow-black shadow-inner">
              <div
                  className={`absolute top-1 left-1 w-9 h-9 md:w-10 md:h-10 bg-black rounded-full transition-all duration-500 ease-in-out ${
                  layout === "list" ? "translate-x-9 md:translate-x-10" : "translate-x-0"
                  }
                      `}
              />
                  <button
                    onClick={() => setLayout("grid")}
                    className={`z-10 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer 
                        transition-colors duration-300 ease-in-out
                      ${
                      layout === "grid" ? "text-white" : "text-black" 
                    }`}
                  >
                    <i className="material-icons">grid_on</i>
                  </button>

                  <button
                    onClick={() => setLayout("list")}
                    className={`z-10 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer 
                      transition-colors duration-300 ease-in-out
                      ${
                      layout === "list" ? "text-white" : "text-black"
                    }`}
                  >
                    <i className="material-icons">view_list</i>
                  </button>

              </div>
            </div>
        {/* </div> */}

        {/* <div className="max-w-7xl mx-auto px-6"> */}
          {connections?.length > 0 ? (
            // <div className="w-full flex justify-center items-center p-10">
              <div
                key={layout}
                className={`w-full transition-all duration-500 ease-in-out transform
                  ${layout === 'grid'
                    ? 'flex flex-wrap flex-row justify-center gap-6'
                    : 'flex flex-col items-center gap-6'
                  }`}
              >
                {connections?.map((user) => {
                  const displayName = truncateText(`${user.firstName} ${user.lastName}`, 35);
                  const displayBio = truncateText(user.bio, 100);
                  const displaySkills = truncateSkills(user.skills, 25);

                  return (
                    <div
                      key={user._id}
                      className={`bg-amber-500 rounded-2xl shadow-black shadow-lg hover:shadow-2xl transition-all duration-500 p-6 justify-between transform ${
                        layout === 'list'
                          ? 'flex flex-col w-[65%] md:flex-row items-center gap-6 scale-[1.01]'
                          : 'flex flex-col w-96 scale-100'
                      }`}
                    >

                      <div className="flex items-center gap-4 w-full md:w-auto">
                      <AdvancedImage
                          cldImg={cld.image(user.profileImage).resize(fill().width(250).height(250))}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                      />
                      <div className='' >
                          <h2 className="text-xl font-semibold text-black">
                          {displayName} {layout === 'list' && <span>, {calculateAge(user.dateOfBirth)}</span>}
                          </h2>
                          {layout === 'grid' && <p className="text-sm text-gray-950">{displayBio}</p>}
                      </div>
                      </div>

                      {layout === 'grid' && (
                      <div className="mt-4 md:mt-0 w-full md:w-auto">
                          <div className="text-sm text-gray-800 mb-2">
                          <span className="font-semibold">Gender:</span> {user.gender}
                          </div>
                          <div className="text-sm text-gray-800 mb-2">
                          <span className="font-semibold">Age:</span> {calculateAge(user.dateOfBirth)}
                          </div>
                          <div className="mb-2">
                          <span className="font-semibold text-sm text-gray-800">Skills:</span>
                          <ul className="flex flex-wrap gap-2 mt-1">
                              {displaySkills?.map((skill, idx) => (
                              <li key={idx} className="px-2 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                  {skill}
                              </li>
                              ))}
                          </ul>
                          </div>
                          <div className="flex gap-3 mt-3 flex-wrap">
                          {user.socialLinks?.github && (
                              <a href={user.socialLinks.github} className="text-sm text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer">GitHub</a>
                          )}
                          {user.socialLinks?.linkedin && (
                              <a href={user.socialLinks.linkedin} className="text-sm text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer">LinkedIn</a>
                          )}
                          {user.socialLinks?.portfolio && (
                              <a href={user.socialLinks.portfolio} className="text-sm text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer">Portfolio</a>
                          )}
                          </div>
                      </div>
                      )}

                      <div className="mt-6 flex gap-4">
                      <RejectButton _id={user._id} />
                      <ChatButton user={user} />
                      </div>
                  </div>

                  )

                })}
              </div>
            // </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center mt-20">
              {/* 👇 Lottie animation */}
              <div className="w-64 h-64 mb-6">
                <Lottie animationData={emptyBoxAnimation} loop={true} />
              </div>
              
              <h2 className={`text-2xl font-bold ${displayMode === "Light" ? "text-gray-900" : "text-gray-300" } mb-2`}>
                😕 No Connections Yet
              </h2>
              <p className={`text-md ${displayMode === "Light" ? "text-gray-700" : "text-gray-400" }`}>
                Start interacting and your connections will appear here!
              </p>
            </div>

          )}
        </div>
    // </div>
  );
};

export default Connections;