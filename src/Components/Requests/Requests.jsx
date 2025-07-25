import axios from "axios";
import React, { useEffect, useState } from "react";
import { errorMessage } from "../../utils/ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/ReduxStore/requestSlice";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

import Lottie from "lottie-react";
import emptyBoxAnimation from "../../assets/Empty Box.json"; // adjust path if needed

const Requests = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dilpkrfrb",
    },
  });

  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests.requestContent);
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

    const fetchRequestData = async () => {
        try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "user/requests/received", {
            withCredentials: true,
        });
        dispatch(addRequest(res?.data?.data));
        } catch (error) {
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
        dispatch(removeRequest(_id));
        } catch (error) {
        errorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchRequestData();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-center">

            <div className="shadow-md py-6 mb-8 flex flex-col items-center md:w-[80%] rounded-2xl bg-black/60">
                <h1 className="text-center text-5xl mb-3 font-bold text-white tracking-wide">Requests</h1>
                
                <div className="relative bg-gray-300 rounded-full p-1 flex items-center w-[80px] md:w-[90px] shadow-black shadow-inner">
                    <div
                        className={`absolute top-1 left-1 w-9 h-9 md:w-10 md:h-10 bg-black rounded-full transition-all duration-500 ease-in-out ${
                        viewMode === "list" ? "translate-x-9 md:translate-x-10" : "translate-x-0"
                        }
                            `}
                    />
                       <button
                            onClick={() => setViewMode("grid")}
                            className={`z-10 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer 
                                transition-colors duration-300 ease-in-out
                            ${
                            viewMode === "grid" ? "text-white" : "text-black" 
                            }`}
                        >
                            <i className="material-icons">grid_on</i>
                        </button>

                        <button
                            onClick={() => setViewMode("list")}
                            className={`z-10 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer 
                            transition-colors duration-300 ease-in-out
                            ${
                            viewMode === "list" ? "text-white" : "text-black"
                            }`}
                        >
                            <i className="material-icons">view_list</i>
                        </button>
                </div>
            </div>
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
                                .image(req.fromUserId.profileImage)
                                .resize(fill().width(250).height(250))}
                            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {req.fromUserId.firstName} {req.fromUserId.lastName} { viewMode === "list" && <span> , {calculateAge(req.fromUserId.dateOfBirth)} </span> }
                            </h2>
                            { viewMode === "grid" && <p className="text-sm text-gray-500">{req.fromUserId.bio}</p> }
                            
                        </div>
                    </div>

                    {/* Details (Only in grid view) */}
                    {viewMode === "grid" && (
                        <div className="mt-4 md:mt-0 w-full md:w-auto">
                            <div className="text-sm text-gray-700 mb-2">
                                <span className="font-semibold">Gender:</span>{" "}
                                {req.fromUserId.gender}
                            </div>
                            <div className="text-sm text-gray-700 mb-2">
                                <span className="font-semibold">Age:</span>{" "}
                                {calculateAge(req.fromUserId.dateOfBirth)}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-sm text-gray-700">
                                    Skills:
                                </span>
                                <ul className="flex flex-wrap gap-2 mt-1">
                                {req.fromUserId.skills.map((skill, idx) => (
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
                                {req.fromUserId.socialLinks?.github && (
                                <a
                                    href={req.fromUserId.socialLinks.github}
                                    className="text-sm text-blue-600 underline hover:text-blue-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                                )}
                                {req.fromUserId.socialLinks?.linkedin && (
                                <a
                                    href={req.fromUserId.socialLinks.linkedin}
                                    className="text-sm text-blue-600 underline hover:text-blue-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                                )}
                                {req.fromUserId.socialLinks?.portfolio && (
                                <a
                                    href={req.fromUserId.socialLinks.portfolio}
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
                    <div className="mt-6 flex gap-4">
                        <button
                            className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 shadow-green-800 shadow-sm text-white font-semibold transition duration-200"
                            onClick={() =>
                                handleRequestReviewClick({
                                review: "accepted",
                                _id: req.fromUserId._id,
                                })
                            }
                        >
                            Accept
                        </button>
                        <button
                            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 shadow-red-800 shadow-sm text-white font-semibold transition duration-200"
                            onClick={() =>
                                handleRequestReviewClick({
                                review: "rejected",
                                _id: req.fromUserId._id,
                                })
                            }
                        >
                            Reject
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center mt-20">
                    {/* 👇 Lottie animation */}
                    <div className="w-64 h-64 mb-6">
                        <Lottie animationData={emptyBoxAnimation} loop={true} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        📭 No Connection Requests
                    </h2>
                    <p className="text-md text-gray-700 text-center max-w-md">
                        It seems quiet here. Once someone sends you a request, it will appear on this page!
                    </p>
                </div>

            )}
        </div>
  );
};

export default Requests;