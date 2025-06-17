import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import { errorMessage } from "../../utils/ShowMessage";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/ReduxStore/feedSlice";
import UserProfileDetail from "./userProfileDetail";

const UserCard = (feed) => {
    const [profilePictureIndex, setProfilePictureIndex] = useState(0);
    const dragThreshold = 10; // minimum pixels to consider it a drag
    const hasMoved = useRef(false);
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false);
    const [renderDetail, setRenderDetail] = useState(false);
    const handleKnowMoreClick = () => {
      setShowDetails((prev) => !prev);
    };
  
    const cardRef = useRef(null);
  
    const [dragDirection, setDragDirection] = useState(""); // 'like', 'nope', 'superlike'
    const [dragStrength, setDragStrength] = useState(0);    // a float between 0 and 1
    // Initialize stroke colors for both buttons
    const [strokeColors, setStrokeColors] = useState(["#be185d", "#166534"]); // pink-800, green-800

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
    const pos = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
  
    const onStart = (e) => {
      isDragging.current = true;
      hasMoved.current = false;
      const x = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      const y = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
      pos.current = { x, y };
    };

  
    const onMove = (e) => {
      if (!isDragging.current) return;
      const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const y = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      const dx = x - pos.current.x;
      const dy = y - pos.current.y;
  
      if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
        hasMoved.current = true; // mark drag start
      }
  
  
      cardRef.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 20}deg)`;
  
      let direction = "";
      let strength = 0;
  
      if (dx > 0 && Math.abs(dx) > Math.abs(dy)) {
        direction = "like";
        strength = Math.min(dx / 150, 1);
      } else if (dx < 0 && Math.abs(dx) > Math.abs(dy)) {
        direction = "nope";
        strength = Math.min(-dx / 150, 1);
      } else if (dy < 0 && Math.abs(dy) > Math.abs(dx)) {
        direction = "superlike";
        strength = Math.min(-dy / 150, 1);
      }
  
      setDragDirection(direction);
      setDragStrength(strength);
  
    };
  
  
    const onEnd = (e) => {
      if (!isDragging.current || !hasMoved.current) {
        isDragging.current = false;
        hasMoved.current = false;
        return; // prevent accidental clicks
      }
  
      isDragging.current = false;
      const x = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
      const dx = x - pos.current.x;
  
      cardRef.current.style.transition = "transform 0.3s ease";
      cardRef.current.style.transform = "translate(0px, 0px) rotate(0deg)";
  
      if (dx > 150) {
        const btn = document.getElementById("interested-btn");
        if (btn) {
          btn.classList.add("scale-125");
          setTimeout(() => {
            btn.click();
            btn.classList.remove("scale-125");
          }, 150);
        }
      } else if (dx < -150) {
        const btn = document.getElementById("ignore-btn");
        if (btn) {
          btn.classList.add("scale-125");
          setTimeout(() => {
            btn.click();
            btn.classList.remove("scale-125");
          }, 150);
        }
      }
  
      setTimeout(() => {
        cardRef.current.style.transition = "none";
      }, 300);
  
      hasMoved.current = false;
      document.getElementById("interested-btn")?.classList.remove("scale-125");
      document.getElementById("ignore-btn")?.classList.remove("scale-125");
    };

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


      const card = cardRef.current;
      card.addEventListener("mousedown", onStart);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseup", onEnd);
      card.addEventListener("mouseleave", onEnd);
  
      card.addEventListener("touchstart", onStart);
      card.addEventListener("touchmove", onMove);
      card.addEventListener("touchend", onEnd);
  
      return () => {
        card.removeEventListener("mousedown", onStart);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseup", onEnd);
        card.removeEventListener("mouseleave", onEnd);
  
        card.removeEventListener("touchstart", onStart);
        card.removeEventListener("touchmove", onMove);
        card.removeEventListener("touchend", onEnd);
      };
    }, [showDetails]);

  return (
    // <div className="flex flex-col h-full " >
    <div className={`h-full`} >
      

    
      <div className="p-1 border border-gray-600 bg-gray-600 shadow-black shadow-xl rounded-xl flex flex-col md:flex-row h-9/12 m-4 transition-all duration-500 ease-in-out">

        {/* Card Section */}
        <div className="h-full w-full md:w-[24rem]">
          <Card
            feed={feed}
            profilePictureIndex={profilePictureIndex}
            setProfilePictureIndex={setProfilePictureIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
            ref={cardRef}
            dragDirection={dragDirection}
            dragStrength={dragStrength}
            onKnowMoreClick={handleKnowMoreClick}
          />
        </div>

        {/* Details Section */}
        <div
          className={`
            overflow-hidden bg-gray-700 rounded-xl flex-grow
            transition-all md:transition-[max-width] duration-1000 ease-in-out
            ${showDetails
              ? "opacity-100 md:max-w-[32rem] max-h-[1000px]"
              : " max-h-0 md:max-h-[1000px] md:max-w-0"}
          `} 
        >
          {renderDetail && (
            <div className={`w-full h-full m-1 min-h-[20rem] md:w-[24rem] transition-all md:transition-[max-width] duration-1000 ease-in-out`}>
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
              className="group bg-gray-800 h-20 w-20 flex items-center justify-center 
                        rounded-full cursor-pointer
                        transition-all duration-300 ease-in-out 
                        transform hover:scale-125 active:scale-100 shadow-lg
                        hover:bg-[#FD267A] active:bg-pink-700"
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
              className="group bg-gray-800 h-20 w-20 flex items-center justify-center 
                        rounded-full cursor-pointer
                        transition-all duration-300 ease-in-out 
                        transform hover:scale-125 active:scale-100 shadow-lg
                        hover:bg-[#167d32] active:bg-[#167d32]"
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

      {/* Profile Detail Section */}

    </div>
    
    // </div>
  );
};

export default UserCard;