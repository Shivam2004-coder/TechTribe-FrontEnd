import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../../utils/Constants/constants';
import { errorMessage } from '../../utils/ShowMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../../utils/ReduxStore/requestSlice';
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

const Requests = () => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const dispatch = useDispatch();
    const request = useSelector((store) => store.requests.requestContent);
    console.log("hi i am request !!");
    console.log(request);

    const fetchRequestData = async () => {
        try {
            await axios.get(BASE_URL + "user/requests/received", {
                withCredentials: true
            })
            .then((res) => {
                dispatch(addRequest(res?.data?.data));
                console.log(res.data.data);
            });
        } catch (error) {
            errorMessage(error.message);
        }
    };

    const handleRequestReviewClick = async ({ review, _id }) => {
        try {
            console.log(BASE_URL+""+`request/review/${review}/${_id}`);
            await axios.post(BASE_URL + `request/review/${review}/${_id}`, {}, {
                withCredentials: true
            });
            dispatch(removeRequest(_id));
        } catch (error) {
            errorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchRequestData();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-gray-800 underline decoration-amber-500">Connection Requests</h1>
            </div>

            {request?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {request.map((req) => (
                        <div key={req._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    {/* <img
                                        src={req.fromUserId.profileImage}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                                    /> */}
                                    <div className="w-16 h-16 rounded-full object-cover border-2 border-amber-500" >
                                        <AdvancedImage cldImg={cld.image(req.fromUserId.profileImage).resize(fill().width(250).height(250))} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{req.fromUserId.firstName} {req.fromUserId.lastName}</h2>
                                        <p className="text-sm text-gray-500">{req.fromUserId.bio}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">Gender:</span> {req.fromUserId.gender}
                                </div>
                                <div className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">Age:</span> {req.fromUserId.age}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-sm text-gray-700">Skills:</span>
                                    <ul className="flex flex-wrap gap-2 mt-1">
                                        {req.fromUserId.skills.map((skill, idx) => (
                                            <li key={idx} className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-3 mt-3">
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
                            <div className="mt-6 flex justify-between">
                                <button
                                    className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition duration-200"
                                    onClick={() => handleRequestReviewClick({ review: "accepted", _id: req.fromUserId._id })}
                                >
                                    Accept
                                </button>
                                <button
                                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-200"
                                    onClick={() => handleRequestReviewClick({ review: "rejected", _id: req.fromUserId._id })}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 text-xl font-medium mt-20">
                    No connection requests at the moment.
                </div>
            )}
        </div>
    );
};

export default Requests;


















// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { BASE_URL } from '../../utils/Constants/constants'
// import { errorMessage } from '../../utils/ShowMessage'
// import { useDispatch, useSelector } from 'react-redux'
// import { addRequest, removeRequest } from '../../utils/ReduxStore/requestSlice'

// const Requests = () => {
//     const dispatch = useDispatch();

//     const request = useSelector((store) => store.requests.requestContent);
//     console.log(request);


//     const fetchRequestData = async () => {
//         try {
//             await axios.get(BASE_URL+"user/requests/received" , {
//                 withCredentials: true
//             })
//             .then((res) => {
//                 console.log(res?.data?.data);
//                 dispatch(addRequest(res?.data?.data));
//             });
//         } catch (error) {
//             errorMessage(error.message);
//         }
//     };

//     const handleRequestReviewClick = async ({ review, _id }) => {
//         try {
//             await axios.post(`${BASE_URL}request/review/${review}/${_id}`, {}, {
//                 withCredentials: true
//             });
            
//             dispatch(removeRequest(_id));  // this should trigger re-render
//         } catch (error) {
//             errorMessage(error.message);
//         }
//     };
    

//     useEffect(() => {
//         fetchRequestData();
//     },[]);

//   return (
//     <div className="w-full" >
//         <div className="flex justify-center items-center w-full bg-amber-500 shadow shadow-black p-4" >
//             <h1 className="text-4xl">Requests</h1>
//         </div>
//         { request &&
//             <div>
//                 {/* requested user information */}
//                 <h1 className="bg-black p-4 rounded-2xl" >FirstName : {request[0]?.fromUserId?.firstName} </h1>
//                 {/* ..... */}
//                 <button className="bg-blue-600 text-2xl rounded-2xl hover:scale-110 p-4" 
//                     onClick={() => handleRequestReviewClick({review: "accepted" , _id: request[0].fromUserId._id})}
//                 >
//                     Accept
//                 </button>
//                 <button className="bg-amber-600 text-2xl rounded-2xl hover:scale-110 p-4" 
//                     onClick={() => handleRequestReviewClick({review: "rejected" , _id: request[0].fromUserId._id})}        
//                 >
//                     Reject
//                 </button>
//             </div>
//         }
//     </div>
//   )
// }

// export default Requests;