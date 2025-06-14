import React from "react";
import { errorMessage } from "../../utils/ShowMessage";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/ReduxStore/feedSlice";

const Card = (p) => {

    const dispatch = useDispatch();

  const {
    feed,
    profilePictureIndex,
    setProfilePictureIndex,
    handleNext,
    handlePrev,
    setAnimationClass,

  } = p;

  const {
    _id,
    firstName,
    lastName,
    age,
    // gender,
    // profilePicture,
    uploadedImages,
    // bio,
    // skills,
    // socialLinks,
  } = feed.feed;


//   console.log("I am in card.jsx!!");
//   console.log(feed.feed);
//   console.log(uploadedImages);

//   console.log(
//     gender + " " + bio + " " + skills + " " + socialLinks + " " + profilePicture + " " + uploadedImages
//   );

  const handleRequestClick = async ({status , _id}) => {
    try {
        if (status === 'interested') {
          setAnimationClass('slide-out-right');
        } else if (status === 'ignored') {
          setAnimationClass('slide-out-left');
        }
        await axios.post(BASE_URL+`request/send/${status}/${_id}`,{},{
            withCredentials: true
        })
        .then(() => {
            dispatch(removeFeed(_id));
            setAnimationClass('');
        });
    } catch (error) {
        errorMessage(error.message);
    }
  };
  

  return (
    <div className="p-1 border bg-gray-300 shadow-black shadow-lg m-4" >
        <div
            className="relative flex flex-col h-96 w-80 overflow-hidden shadow m-3 shadow-black"
            style={{
                backgroundImage: `url("https://res.cloudinary.com/dilpkrfrb/image/upload/v1744462596/${uploadedImages[profilePictureIndex]}")`,
                // backgroundImage: `url(${uploadedImages[profilePictureIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dots for Image Selection - Moved to the Top */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {uploadedImages.map((_, index) => (
                <div
                    key={index}
                    className={`h-4 w-4 rounded-full cursor-pointer shadow shadow-black ${
                    index === profilePictureIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setProfilePictureIndex(index)}
                />
                ))}
            </div>

            {/* Left Arrow */}
            <button
                className="absolute left-2 top-1/2 w-10 h-10 flex items-center justify-center cursor-pointer transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                onClick={handlePrev}
            >
                ◀
            </button>

            {/* Right Arrow */}
            <button
                className="absolute right-2 top-1/2 w-10 h-10 flex items-center justify-center cursor-pointer transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                onClick={handleNext}
            >
                ▶
            </button>

            {/* User Info Overlay */}
            <div className="absolute bottom-0 grid grid-cols-12 rounded-t-xl text-white w-full bg-gray-400 opacity-95 bg-gradient-to-b from-black p-4">
                <div className="col-span-8" >
                    <h1 className="text-lg font-bold">{firstName + " " + lastName}</h1>
                    {age && <span>{age} years old</span>}
                    <h3 className="flex items-center" ><i className="material-icons">house</i> Lives in Delhi</h3>
                </div>
                <div className="col-span-4 h-full flex items-center" >
                    <button className="bg-amber-600 p-4 shadow shadow-black hover:bg-amber-700 cursor-pointer active:shadow-inner active:bg-amber-700" >
                        Know More
                    </button>
                </div>
            </div>
        </div>
        {/* Buttons Section */}
        <div className="flex justify-around space-x-6">
            {/* Ignore Button */}
            <button
                id="ignore-btn"
                className="group bg-red-600 h-12 w-12 flex items-center justify-center 
                            transition-all duration-300 ease-in-out 
                            transform hover:scale-105 active:scale-95 
                            shadow-[rgba(0,0,0,0.6)_-4px_4px_0px_0px]"
                onClick={() => handleRequestClick({ status: "ignored", _id: _id })}
            >
                <i
                    className="material-icons text-white text-xl transition-all duration-300 ease-in-out 
                            group-hover:text-black group-hover:scale-125 group-active:rotate-12"
                >
                    close
                </i>
            </button>


            {/* Interested Button */}
            <button
                id="interested-btn"
                className="group bg-green-600 h-12 w-12 flex items-center justify-center 
                            transition-all duration-300 ease-in-out 
                            transform hover:scale-105 active:scale-95 
                            shadow-[rgba(0,0,0,0.6)_-4px_4px_0px_0px]"
                onClick={() => handleRequestClick({ status: "interested", _id: _id })}
            >
                <i
                    className="material-icons text-white text-xl transition-all duration-300 ease-in-out 
                            group-hover:text-red-600 group-hover:scale-125 group-active:scale-90"
                >
                    favorite
                </i>
            </button>

        </div>

  </div>
  );
};

export default Card;
