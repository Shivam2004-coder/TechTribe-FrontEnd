import axios from "axios";
import React, { useEffect, useState } from "react";
import { errorMessage } from "../../utils/ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import { addRequestIgnored, removeRequestIgnored } from "../../utils/ReduxStore/requestSlice";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { formatDistanceToNow } from 'date-fns';

const Ignored = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dilpkrfrb",
    },
  });

  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests.requestIgnoredContent);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

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

    const fetchRequestSentData = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BASE_URL + "user/sent/requests/ignored", {
                withCredentials: true,
            });
            dispatch(addRequestIgnored(res?.data?.data));
        } 
        catch (error) {
            errorMessage(error.message);
        }
    };

    const handleRequestReviewClick = async ({ review, _id }) => {
        try {
        await axios.post(
            `${import.meta.env.VITE_BASE_URL}request/review/${review}/${_id}`,
            {},
            {
            withCredentials: true,
            }
        );
        dispatch(removeRequestIgnored(_id));
        } catch (error) {
        errorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchRequestSentData();
    }, []);

    return (
        <div className="w-full min-h-screen">

            <div className="shadow-md py-6 mb-8 flex flex-col items-center">
                <h1 className="text-center text-5xl mb-3 font-bold text-white tracking-wide">Ignored List</h1>
                
                <div className="relative bg-gray-300 rounded-full p-1 flex items-center w-[80px] md:w-[90px] shadow-black shadow-inner">
                    <div
                        className={`absolute top-1 left-1 w-9 h-9 md:w-10 md:h-10 bg-amber-950 rounded-full transition-all duration-500 ease-in-out ${
                        viewMode === "list" ? "translate-x-9 md:translate-x-10" : "translate-x-0"
                        }
                            `}
                    />
                        <button
                            className="z-10 w-9 h-9 md:w-10 md:h-10 text-amber-500 flex items-center justify-center cursor-pointer "
                            onClick={() => setViewMode("grid")}
                        >
                            <i className="material-icons">grid_on</i>
                        </button>
                        <button
                            className="z-10 w-9 h-9 md:w-10 md:h-10 text-amber-500 flex items-center justify-center cursor-pointer"
                            onClick={() => setViewMode("list")}
                        >
                            <i className="material-icons">view_list</i>
                        </button>
                </div>
            </div>
            
            {/* <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 underline decoration-amber-500">
                    
                </h1>

                <div className="relative bg-gray-300 rounded-full p-1 flex items-center w-[80px] md:w-[90px] shadow-black shadow-inner">
                    <div
                        className={`absolute top-1 left-1 w-9 h-9 md:w-10 md:h-10 bg-black rounded-full transition-all duration-500 ease-in-out ${
                        viewMode === "list" ? "translate-x-9 md:translate-x-10" : "translate-x-0"
                        }`}
                    />
                        <button
                            className="z-10 w-9 h-9 md:w-10 md:h-10 text-white flex items-center justify-center cursor-pointer"
                            onClick={() => setViewMode("grid")}
                        >
                            <i className="material-icons">grid_view</i>
                        </button>
                        <button
                            className="z-10 w-9 h-9 md:w-10 md:h-10 text-white flex items-center justify-center cursor-pointer"
                            onClick={() => setViewMode("list")}
                        >
                            <i className="material-icons">view_list</i>
                        </button>
                    </div>
                </div> */}

            {request?.length > 0 ? (
                <div
                    key={viewMode}
                    className={`transition-all duration-500 ease-in-out transform ${
                        viewMode === "grid"
                        ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "flex flex-col gap-6"
                    }`}
                >
                {request.map((req) => (
                    <div
                        key={req._id}
                        className={`bg-amber-500 rounded-2xl shadow-black shadow-lg hover:shadow-2xl transition-all duration-500 p-6 justify-between transform ${
                            viewMode === "list"
                            ? "flex flex-col md:flex-row items-center gap-6 scale-[1.01]"
                            : "flex flex-col scale-100"
                        }`}
                    >
                    {/* Image + Info */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <AdvancedImage
                            cldImg={cld
                                .image(req.toUserId.profileImage)
                                .resize(fill().width(250).height(250))}
                            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {req.toUserId.firstName} {req.toUserId.lastName} { viewMode === "list" && <span> , {calculateAge(req.toUserId.dateOfBirth)} </span> }
                            </h2>
                            { viewMode === "grid" && <p className="text-sm text-gray-500">{req.toUserId.bio}</p> }
                            
                        </div>
                    </div>

                    {/* Details (Only in grid view) */}
                    {viewMode === "grid" && (
                        <div className="mt-4 md:mt-0 w-full md:w-auto">
                            <div className="text-sm text-gray-700 mb-2">
                                <span className="font-semibold">Gender:</span>{" "}
                                {req.toUserId.gender}
                            </div>
                            <div className="text-sm text-gray-700 mb-2">
                                <span className="font-semibold">Age:</span>{" "}
                                {calculateAge(req.toUserId.dateOfBirth)}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-sm text-gray-700">
                                    Skills:
                                </span>
                                <ul className="flex flex-wrap gap-2 mt-1">
                                {req.toUserId.skills.map((skill, idx) => (
                                    <li
                                        key={idx}
                                        className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
                                    >
                                        {skill}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className="flex gap-3 mt-3 flex-wrap">
                                {req.toUserId.socialLinks?.github && (
                                <a
                                    href={req.toUserId.socialLinks.github}
                                    className="text-sm text-blue-600 underline hover:text-blue-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                                )}
                                {req.toUserId.socialLinks?.linkedin && (
                                <a
                                    href={req.toUserId.socialLinks.linkedin}
                                    className="text-sm text-blue-600 underline hover:text-blue-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                                )}
                                {req.toUserId.socialLinks?.portfolio && (
                                <a
                                    href={req.toUserId.socialLinks.portfolio}
                                    className="text-sm text-blue-600 underline hover:text-blue-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Portfolio
                                </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex items-center justify-between gap-4">
                        <button
                            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 shadow-red-800 shadow-sm text-white font-semibold transition duration-200"
                            onClick={() =>
                                handleRequestReviewClick({
                                    review: "rejected",
                                    _id: req.toUserId._id,
                                })
                            }
                        >
                            Reject
                        </button>
                        <button
                            className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 shadow-green-800 shadow-sm text-white font-semibold transition duration-200"
                            onClick={() =>
                                handleRequestReviewClick({
                                review: "interested",
                                _id: req.toUserId._id,
                                })
                            }
                        >
                            Interested
                        </button>
                    </div>
                    <p className="text-black text-md mt-5 font-bold italic">
                        Ignored by you {formatDistanceToNow(new Date(req.updatedAt), { addSuffix: true })}
                    </p>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center text-white text-xl font-medium mt-20">
                    <div className='flex items-center justify-center bg-black p-6 rounded-full' >
                        Ignored list is Empty
                    </div>
                </div>
            )}
        </div>
  );
};

export default Ignored;