// Connections.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../../utils/Constants/constants";
import { errorMessage } from "../../utils/ShowMessage";
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../../utils/ReduxStore/connectionSlice';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import ExploreButton from './ExploreButton';
import ChatButton from './ChatButton';
import { motion, AnimatePresence } from "framer-motion";
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

const Connections = () => {

     // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const connections = useSelector((store) => store.connections.connectionContent);
    const dispatch = useDispatch();
    const [layout, setLayout] = useState('grid');

    const fetchConnectionsData = async () => {
        // if (!connections) {
            try {
                const res = await axios.get(BASE_URL + "user/requests/connections", {
                    withCredentials: true
                });
                dispatch(addConnection(res.data.data));
            } catch (error) {
                errorMessage(error.message);
            }
        // }
    };

    useEffect(() => {
        fetchConnectionsData();
    }, []);

    // const getRandomProfilePic = (pictures) => {
    //     return pictures[Math.floor(Math.random() * pictures.length)];
    // };

    return (
        <div className="min-h-screen w-full bg-gray-50 transition-all duration-500">
            {/* Header */}
            <div className="bg-amber-700 shadow-md py-6 mb-8 flex flex-col items-center">
                <h1 className="text-center text-5xl font-bold text-white tracking-wide">Connections</h1>
                <div className="mt-4 flex gap-4">
                    <button
                        onClick={() => setLayout('grid')}
                        className={`px-4 py-2 cursor-pointer flex items-center justify-center rounded-lg font-semibold ${layout === 'grid' ? 'bg-white text-amber-700' : 'bg-amber-500 text-white'}`}
                    >
                        <span className="material-symbols-outlined"> grid_view </span>
                    </button>
                    <button
                        onClick={() => setLayout('row')}
                        className={`px-4 py-2 cursor-pointer flex items-center justify-center rounded-lg font-semibold ${layout === 'row' ? 'bg-white text-amber-700' : 'bg-amber-500 text-white'}`}
                    >
                        <span className="material-symbols-outlined"> view_list </span>
                    </button>
                </div>
            </div>

            {/* Dynamic Layout */}
            <AnimatePresence>
                <motion.div
                    key={layout}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`max-w-7xl mx-auto px-6 ${layout === 'grid' ? 'grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-6'}`}
                >
                    {connections?.map((user) => (
                        <div
                            key={user._id}
                            className="bg-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className={`flex ${layout === 'row' ? 'flex-row items-center gap-6' : 'flex-col items-center'} mb-4`}>
                                {/* <img
                                    src={user.profileImage}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-24 h-24 object-cover rounded-full border-4 border-amber-500"
                                /> */}
                                <div className="w-24 h-24 object-cover rounded-full border-4 border-amber-500" >
                                    <AdvancedImage cldImg={cld.image(user.profileImage).resize(fill().width(250).height(250))} />
                                </div>
                                <div className={`text-${layout === 'row' ? 'left' : 'center'} w-full`}>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {user.firstName} {user.lastName}, {user.age}
                                    </h2>
                                    <p className="text-gray-600 mt-2 text-sm">{user.bio}</p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {user.skills?.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex gap-4">
                                        <ExploreButton />
                                        <ChatButton _id={user._id} />
                                    </div>

                                    <div className="mt-4 flex gap-6 text-amber-700 text-lg">
                                        {user.socialLinks?.github && (
                                            <a
                                                href={user.socialLinks.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-amber-900 transition-transform transform hover:scale-110"
                                            >
                                                <FaGithub />
                                            </a>
                                        )}
                                        {user.socialLinks?.linkedin && (
                                            <a
                                                href={user.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-amber-900 transition-transform transform hover:scale-110"
                                            >
                                                <FaLinkedin />
                                            </a>
                                        )}
                                        {user.socialLinks?.portfolio && (
                                            <a
                                                href={user.socialLinks.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-amber-900 transition-transform transform hover:scale-110"
                                            >
                                                <FaGlobe />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Connections;