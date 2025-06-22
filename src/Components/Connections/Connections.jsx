// Connections.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../../utils/Constants/constants";
import { errorMessage } from "../../utils/ShowMessage";
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../../utils/ReduxStore/connectionSlice';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import RejectButton from './RejectButton';
import ChatButton from './ChatButton';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const Connections = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dilpkrfrb'
    }
  });

  const connections = useSelector((store) => store.connections.connectionContent);
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

  const fetchConnectionsData = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/connections", {
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* <div className="min-h-screen w-full bg-gray-50 transition-all duration-500"> */}
        <div className="bg-amber-700 shadow-md py-6 mb-8 flex flex-col items-center">
            <h1 className="text-center text-5xl mb-3 font-bold text-white tracking-wide">Connections</h1>
            
            <div className="relative bg-gray-300 rounded-full p-1 flex items-center w-[80px] md:w-[90px] shadow-black shadow-inner">
                <div
                    className={`absolute top-1 left-1 w-9 h-9 md:w-10 md:h-10 bg-amber-950 rounded-full transition-all duration-500 ease-in-out ${
                    layout === "list" ? "translate-x-9 md:translate-x-10" : "translate-x-0"
                    }
                        `}
                />
                    <button
                        className="z-10 w-9 h-9 md:w-10 md:h-10 text-amber-500 flex items-center justify-center cursor-pointer "
                        onClick={() => setLayout("grid")}
                    >
                        <i className="material-icons">grid_on</i>
                    </button>
                    <button
                        className="z-10 w-9 h-9 md:w-10 md:h-10 text-amber-500 flex items-center justify-center cursor-pointer"
                        onClick={() => setLayout("list")}
                    >
                        <i className="material-icons">view_list</i>
                    </button>
                </div>
        </div>
        {/* </div> */}

        <div className="max-w-7xl mx-auto px-6">
          {connections?.length > 0 ? (
            <div className={`${layout === 'grid' ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-6'}`}>
                {connections?.map((user) => (
                <div
                    key={user._id}
                    className={`bg-violet-400 rounded-2xl shadow-black shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ${layout === 'row' ? 'flex flex-col md:flex-row items-center gap-6 scale-[1.01]' : 'flex flex-col scale-100'}`}
                >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                    <AdvancedImage
                        cldImg={cld.image(user.profileImage).resize(fill().width(250).height(250))}
                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-black">
                        {user.firstName} {user.lastName} {layout === 'list' && <span>, {calculateAge(user.dateOfBirth)}</span>}
                        </h2>
                        {layout === 'grid' && <p className="text-sm text-gray-950">{user.bio}</p>}
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
                            {user.skills?.map((skill, idx) => (
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
                    <ChatButton _id={user._id} />
                    </div>
                </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-xl font-medium mt-20">
              You don’t have any connections yet.
            </div>
          )}
        </div>
    </div>
  );
};

export default Connections;