import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import { errorMessage } from "../../utils/ShowMessage";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/ReduxStore/feedSlice";

const UserCard = (feed) => {
  const [profilePictureIndex, setProfilePictureIndex] = useState(0);
    const dragThreshold = 10; // minimum pixels to consider it a drag
    const hasMoved = useRef(false);
    const dispatch = useDispatch();
  
    const cardRef = useRef(null);
  
    const [dragDirection, setDragDirection] = useState(""); // 'like', 'nope', 'superlike'
    const [dragStrength, setDragStrength] = useState(0);    // a float between 0 and 1
  
  
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
    }, []);

  return (
    <div className={`relative`} >
      

    
      <div className="p-1 border border-gray-600 bg-gray-600 shadow-black shadow-xl rounded-xl flex flex-col h-9/12 m-4" >
        <Card
          feed={feed}
          profilePictureIndex={profilePictureIndex}
          setProfilePictureIndex={setProfilePictureIndex}
          handleNext={handleNext}
          handlePrev={handlePrev}
          ref={cardRef}
          dragDirection={dragDirection}
          dragStrength={dragStrength}
        />
      </div>

      {/* Buttons Section - Absolutely Positioned */}
        <div className="relative h-0">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] flex space-x-32 z-10">
                {/* Ignore Button */}
                <button
                    id="ignore-btn"
                    className="group bg-gray-700 h-16 w-16 flex items-center justify-center 
                                rounded-full cursor-pointer
                                transition-all duration-300 ease-in-out 
                                transform hover:scale-115 active:scale-95 shadow-lg"
                    onClick={() => handleRequestClick({ status: "ignored", _id: _id })}
                >
                    <i className="material-icons text-white">close</i>
                </button>

                {/* Interested Button */}
                <button
                    id="interested-btn"
                    className="group bg-gray-700 h-16 w-16 flex items-center justify-center 
                                rounded-full cursor-pointer
                                transition-all duration-300 ease-in-out 
                                transform hover:scale-115 active:scale-95 shadow-lg "
                    onClick={() => handleRequestClick({ status: "interested", _id: _id })}
                >
                    <i className="material-icons text-white">favorite</i>
                </button>
            </div>
        </div>
    </div>
  );
};

export default UserCard;