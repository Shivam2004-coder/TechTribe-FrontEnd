import React, { useState , useEffect, useRef } from "react";
import Card from "./Card";
import { errorMessage } from "../../utils/ShowMessage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/ReduxStore/feedSlice";
import UserProfileDetail from "./userProfileDetail";

const UserCard = ({feed , isProfile}) => {
    const [isHovered, setIsHovered] = useState(true);
    const [profilePictureIndex, setProfilePictureIndex] = useState(0);
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false);
    const [renderDetail, setRenderDetail] = useState(false);
    const handleKnowMoreClick = () => {
      setShowDetails((prev) => !prev);
    };

    const [isVisible, setIsVisible] = useState(false);


    const timeoutRef = useRef(null);

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 2000);
    };
    const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current); // Cancel any existing timeout
      setIsHovered(true);
    };
    // Initialize stroke colors for both buttons
    const [strokeColors, setStrokeColors] = useState(["#be185d", "#166534","white"]); // pink-800, green-800

    // Handler to update stroke of specific icon
    const updateStroke = (index, color) => {
      const newColors = [...strokeColors];
      newColors[index] = color;
      setStrokeColors(newColors);
    };

    // console.log("feed", feed);
    const { _id , uploadedImages } = feed;
  
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
    const handleRequestClick = async ({ status, _id }) => {
      if (isProfile) {
        // First pop out
        setIsVisible(false);

        // After a short delay, pop back in
        setTimeout(() => {
          setIsVisible(true);
        }, 500); // Matches the pop-out animation time

        return; // Don't proceed to actual request
      }

      // Actual request flow
      setIsVisible(false); // Start pop-out

      setTimeout(async () => {
        try {
          await axios.post(`${import.meta.env.VITE_BASE_URL}request/send/${status}/${_id}`, {}, { withCredentials: true });
          dispatch(removeFeed(_id));
          setIsVisible(true);
          // await axios.post(`${BASE_URL}request/click` , {} , { withCredentials: true } );
        } catch (error) {
          errorMessage(error.message);
        }
      }, 500); // Allow time for animation before removing
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsVisible(true); // show the card with pop-in effect
      }, 500); // small delay to allow transition

      return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
      if (showDetails) {
        setRenderDetail(true); // Mount immediately when opening
      } else {
        // Wait for animation to finish before unmounting
        const timeout = setTimeout(() => setRenderDetail(false), 1000); // match transition duration
        return () => clearTimeout(timeout);
      }
    }, [showDetails]);

    // className={`relative transform transition-all duration-500 ease-in-out 
    //             p-1 border border-gray-600 bg-gray-600 shadow-black shadow-xl 
    //             rounded-xl flex flex-col md:flex-row m-4 
    //             md:h-9/12 ${showDetails ? "h-full md:h-10/12" : "h-9/12"} 
    //             ${isVisible ? `${showDetails ? `${ isProfile ? "scale-75" : "scale-80"}` : `${ isProfile ? "scale-77" : "scale-90"}`}  md:scale-100 opacity-100` : "scale-0 opacity-0"}`}

  return (
    <div className={`h-[40rem] md:h-[40rem] flex flex-col md:flex-row ${isProfile ? "mr-[0rem]" : "mr-0"} `} > {/* << FIXED HEIGHT HERE */}
    {/* <div className="flex w-full h-full md:flex-row flex-col"> */}
      <div
        className={`relative transform transition-all duration-500 ease-in-out 
                    p-1 border border-gray-600 bg-gray-600 shadow-black shadow-xl 
                    rounded-xl flex flex-col md:flex-row m-4 
                    md:h-9/12 ${showDetails ? "h-full md:h-10/12" : "h-9/12"} 
                    ${isVisible ? `${showDetails ? `${ isProfile ? "scale-75" : "scale-80"}` : `${ isProfile ? "scale-77" : "scale-90"}`}  "md:scale-100 opacity-100"` : "scale-0 opacity-0"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Top-right Menu Button */}
        <div className="absolute top-1 right-[0.3rem] md:right-[-2rem] z-20">
          <button
            className={`group bg-gray-800 h-20 w-20 md:h-20 md:w-20 flex items-center justify-center 
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
        {/* <div className="h-full w-full md:w-[24rem]"> h-full removed and max-h-[40rem] added */}
        <div
          className={`
            h-full flex-[1] md:flex-[1]
            transition-all duration-700 ease-in-out 
            max-w-screen
            ${showDetails ? "w-[10rem] md:w-[24rem]" : "md:w-full"}
          `}
        >
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
        {/* Floating Buttons Hanging from Bottom Center */}
        <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 flex gap-20 z-10">     
          {/* Ignore Button */}
          <button
            id="ignore-btn"
            className={`group bg-gray-800 h-20 w-20 md:h-20 md:w-20 flex items-center justify-center 
                      rounded-full cursor-pointer
                      transition-all duration-400 ease-in-out 
                      ${isHovered ? "md:scale-100" : "md:scale-0"}
                      transform hover:scale-125 active:scale-100 shadow-lg
                      hover:bg-[#FD267A] active:bg-pink-700`}
            onMouseEnter={() => updateStroke(0, "white")}
            onMouseLeave={() => updateStroke(0, "#FD267A")}
            onMouseDown={() => updateStroke(0, "black")}
            onMouseUp={() => updateStroke(0, "white")}
            onClick={() => handleRequestClick({ status: "ignored", _id })}
          >
            <i
              className="material-icons font-extrabold  text-[#FD267A] 
                        transition-all duration-300 ease-in-out transform 
                        group-hover:scale-200 group-hover:text-white 
                        group-active:scale-90 group-active:text-black scale-150"
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
            className={`group bg-gray-800 h-20 w-20 md:h-20 md:w-20 flex items-center justify-center 
                      rounded-full cursor-pointer
                      transition-all duration-400 ease-in-out 
                      ${isHovered ? "md:scale-100" : "md:scale-0"}
                      transform hover:scale-125 active:scale-100 shadow-lg
                      hover:bg-[#167d32] active:bg-[#167d32]`}
            onMouseEnter={() => updateStroke(1, "white")}
            onMouseLeave={() => updateStroke(1, "#167d32")}
            onMouseDown={() => updateStroke(1, "black")}
            onMouseUp={() => updateStroke(1, "white")}
            onClick={() => handleRequestClick({ status: "interested", _id })}
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
        
        <div
          className={`
            transition-all duration-700 ease-in-out
            overflow-hidden
            ${showDetails ? "h-9/12 w-[24rem] md:h-full md:w-[24rem] opacity-100 flex-[2]" : "flex-[0] h-0 w-[24rem] md:h-full md:w-0 opacity-0"}
          `}
        >
          {renderDetail && (
            <div className="w-full h-full">
              <UserProfileDetail feed={feed} />
            </div>
          )}
          {/* this is a details section */}
        </div>

      </div>

      

      

    </div>
  );
};

export default UserCard;