import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";

const UserCard = (feed) => {
  const [profilePictureIndex, setProfilePictureIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState("");
    const dragThreshold = 10; // minimum pixels to consider it a drag
    const hasMoved = useRef(false);
  
    const cardRef = useRef(null);
  
    const [dragDirection, setDragDirection] = useState(""); // 'like', 'nope', 'superlike'
    const [dragStrength, setDragStrength] = useState(0);    // a float between 0 and 1
  
  
    const { uploadedImages } = feed.feed;
  
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
    <div className={`card-wrapper ${animationClass} relative`} ref={cardRef}>
      {/* LIKE image (top-right) */}
      <img
        src="/yeap.png"
        alt="Like"
        className="pointer-events-none z-50"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: "80px",
          transform: "rotate(10deg)",
          opacity: dragDirection === "like" ? dragStrength : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
      />

      {/* NOPE image (top-left) */}
      <img
        src="/nope.png"
        alt="Nope"
        className="pointer-events-none z-50"
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          width: "80px",
          transform: "rotate(-10deg)",
          opacity: dragDirection === "nope" ? dragStrength : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
      />

      {/* SUPER-LIKE image (bottom-center) */}
      <img
        src="/like.png"
        alt="Superlike"
        className="pointer-events-none z-50"
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          opacity: dragDirection === "superlike" ? dragStrength : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
      />

      <Card
        feed={feed}
        profilePictureIndex={profilePictureIndex}
        setProfilePictureIndex={setProfilePictureIndex}
        handleNext={handleNext}
        handlePrev={handlePrev}
        setAnimationClass={setAnimationClass}
      />
    </div>
  );
};

export default UserCard;