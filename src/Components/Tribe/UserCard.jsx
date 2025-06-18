import React, { useState , useEffect } from "react";
import Card from "./Card";
import { errorMessage } from "../../utils/ShowMessage";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/ReduxStore/feedSlice";
import UserProfileDetail from "./userProfileDetail";

const UserCard = (feed) => {
    const [isHovered, setIsHovered] = useState(true);
    const [profilePictureIndex, setProfilePictureIndex] = useState(0);
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false);
    const [renderDetail, setRenderDetail] = useState(false);
    const handleKnowMoreClick = () => {
      setShowDetails((prev) => !prev);
    };
  
    // Initialize stroke colors for both buttons
    const [strokeColors, setStrokeColors] = useState(["#be185d", "#166534","white"]); // pink-800, green-800

    // Handler to update stroke of specific icon
    const updateStroke = (index, color) => {
      const newColors = [...strokeColors];
      newColors[index] = color;
      setStrokeColors(newColors);
    };
  
  
    const { _id , uploadedImages } = feed.feed;
  
    const handleNext = () => {
      setProfilePictureIndex((prevIndex) =>
        prevIndex === uploadedImages.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handlePrev = () => {
      setProfilePictureIndex((prevIndex) =>
        prevIndex === 0 ? uploadedImages.length - 1 : prevIndex - 1
      );
    };
  
    // DRAG state
    const handleRequestClick = async ({status , _id}) => {
      try {
          await axios.post(BASE_URL+`request/send/${status}/${_id}`,{},{
              withCredentials: true
          })
          .then(() => {
              dispatch(removeFeed(_id));
          });
      } catch (error) {
          errorMessage(error.message);
      }
    };
  
  
    useEffect(() => {

      if (showDetails) {
        setRenderDetail(true); // Mount immediately when opening
      } else {
        // Wait for animation to finish before unmounting
        const timeout = setTimeout(() => setRenderDetail(false), 1000); // match transition duration
        return () => clearTimeout(timeout);
      }
    }, [showDetails]);

  return (
    // <div className="flex flex-col h-full " >
    <div className={`h-full`} >
      <div className="relative p-1 border border-gray-600 bg-gray-600 shadow-black shadow-xl rounded-xl flex flex-col md:flex-row h-9/12 m-4 transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Top-right Menu Button */}
        <div className="absolute top-1 right-[-2rem] z-20">
          <button
            className={`group bg-gray-800 h-20 w-20 flex items-center justify-center 
                      rounded-full cursor-pointer
                      transition-all duration-400 ease-in-out 
                      ${isHovered ? "md:scale-100" : "md:scale-0"}
                      transform hover:scale-110 active:scale-95 shadow-lg
                      hover:bg-gray-800 active:bg-gray-800`}
            onMouseEnter={() => updateStroke(2, "white")}
            onMouseLeave={() => updateStroke(2, "white")} 
            onClick={handleKnowMoreClick} 
          >
            <i
              className="material-icons font-extrabold text-white 
                        transition-all duration-300 ease-in-out transform 
                        group-hover:scale-150 group-hover:text-white 
                        group-active:scale-90 group-active:text-white scale-125"
              style={{
                WebkitTextStroke: strokeColors[2] ? `1.2px ${strokeColors[2]}` : "0px",
                // textShadow: "rgb(0 0 0) 0px 0px 7px",
              }}
            >
              {showDetails ? "menu_open" : "read_more"}
            </i>
          </button>
        </div>

        {/* Card Section */}
        <div className="h-full w-full md:w-[24rem]">
          <Card
            feed={feed}
            profilePictureIndex={profilePictureIndex}
            setProfilePictureIndex={setProfilePictureIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
            isHovered={isHovered}
          />
        </div>

        {/* Details Section */}
        <div
          className={`
            overflow-hidden flex-grow
            transition-all md:transition-[max-width] duration-1000 ease-in-out
            ${showDetails
              ? "opacity-100 md:max-w-[32rem] max-h-[1000px]"
              : " max-h-0 md:max-h-[1000px] md:max-w-0"}
          `} 
        >
          {renderDetail && (
            <div className={`w-full h-full m-1  min-h-[20rem] md:w-[24rem] transition-all md:transition-[max-width] duration-1000 ease-in-out`}>
              <UserProfileDetail feed={feed} />
            </div>
          )}
        </div>

      </div>



      {/* Buttons Section - Absolutely Positioned */}
        {/* Buttons Section - Absolutely Positioned */}
        <div className="relative h-0">
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] flex space-x-32 z-10">

            {/* Ignore Button */}
            <button
              id="ignore-btn"
              className={`group bg-gray-800 h-20 w-20 flex items-center justify-center 
                        rounded-full cursor-pointer
                        transition-all duration-400 ease-in-out 
                        ${isHovered ? "md:scale-100" : "md:scale-0"}
                        transform hover:scale-125 active:scale-100 shadow-lg
                        hover:bg-[#FD267A] active:bg-pink-700`}
              // onClick={() => handleRequestClick({ status: "ignored", _id: _id })}/
              onMouseEnter={() => updateStroke(0, "white")}
              onMouseLeave={() => updateStroke(0, "#FD267A")} // dark pink
              onMouseDown={() => updateStroke(0, "black")}         // remove stroke
              onMouseUp={() => updateStroke(0, "white")}    // optional reset
            >
              <i
                className="material-icons font-extrabold  text-[#FD267A] 
                          transition-all duration-300 ease-in-out transform 
                          group-hover:scale-200 group-hover:text-white 
                          group-active:scale-90 group-active:text-black scale-150
                          "
                style={{
                  WebkitTextStroke: strokeColors[0] ? `1.2px ${strokeColors[0]}` : "0px",
                  textShadow: "rgb(0 0 0) 0px 0px 7px",
                }}
              >
                close
              </i>
            </button>

            {/* Interested Button */}
            <button
              id="interested-btn"
              className={`group bg-gray-800 h-20 w-20 flex items-center justify-center 
                        rounded-full cursor-pointer
                        transition-all duration-400 ease-in-out 
                        ${isHovered ? "md:scale-100" : "md:scale-0"}
                        transform hover:scale-125 active:scale-100 shadow-lg
                        hover:bg-[#167d32] active:bg-[#167d32]`}
              // onClick={() => handleRequestClick({ status: "interested", _id: _id })}
              onMouseEnter={() => updateStroke(1, "white")}
              onMouseLeave={() => updateStroke(1, "#167d32")} // dark green
              onMouseDown={() => updateStroke(1, "black")} // remove stroke
              onMouseUp={() => updateStroke(1, "white")} // optional reset
            >
              <i
                className="material-icons font-extrabold text-[#167d32]
                          transition-all duration-300 ease-in-out transform 
                          group-hover:scale-200 group-hover:text-white 
                          group-active:scale-90 group-active:text-black scale-150"
                style={{
                  WebkitTextStroke: strokeColors[1] ? `1.2px ${strokeColors[1]}` : "0px",
                  textShadow: "rgb(0 0 0) 0px 0px 7px",
                }}
              >
                favorite
              </i>
            </button>

          </div>
        </div>

    </div>
    
    // </div>
  );
};

export default UserCard;