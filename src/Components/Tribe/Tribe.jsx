import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/ReduxStore/feedSlice";
import { errorMessage } from "../../utils/ShowMessage";
import UserCard from "./UserCard";
// import useFetchUserProfileData from "../../CustomHooks/useFetchUserProfileData";
import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";

import Lottie from "lottie-react";
// 👇 import your downloaded Lottie JSON file
import emptyBoxAnimation from "../../assets/Empty box by partho.json";
import trafficPoliceAnimation from "../../assets/Traffic Police Animation.json";



const Tribe = () => {
  const feed = useSelector((store) => store.feed.feedContent);
  const swipes = useSelector((store) => store.profile.swipes);
  const dispatch = useDispatch();
  // useFetchUserProfileData();

  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState("");
  // const { width, height } = useWindowSize();

    // 🎯 New state for animation
  const [playAnimation, setPlayAnimation] = useState(true);

  const boxRef = useRef(null);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      setBoxSize({ width, height });
    }
  }, []);


  const fetchTribeData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + "user/feed", { withCredentials: true });
      const users = response.data.paginatedUsers;
      dispatch(addFeed(users));
    } catch (err) {
      const errMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      // console.log("ERROR in handleSignInButton : "+err.message);
      errorMessage(errMessage);
    }
  };

  useEffect(() => {
    fetchTribeData();
  }, []);

  // 🎯 Countdown timer logic
  useEffect(() => {
    if (swipes > 30) {
      setShowConfetti(true);

      const interval = setInterval(() => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;

        const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

        setCountdown(`${hrs}:${mins}:${secs}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [swipes]);

  // 🪄 Stop animation after 3 seconds
  useEffect(() => {
    let timer;
    if (playAnimation) {
      timer = setTimeout(() => {
        setPlayAnimation(false);
      }, 3000); // animation plays for 3s then stops
    }
    return () => clearTimeout(timer);
  }, [playAnimation]);

  if (!feed) return null;

  // ✅ Case 1: Limit reached (swipes > 30)
  if (swipes > 30) {

    return (
      <div
        ref={boxRef} // 👈 attach the ref
        className="relative w-9/10 md:w-1/2 h-2/5 md:h-1/2 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm text-black text-xl p-10 rounded-xl shadow-xl"
        // style={{ width: boxWidth, height: boxHeight }}
      >
        {/* Confetti will now be restricted to this box */}
        {showConfetti && (
          <Confetti
            width={boxSize.width}    // 👈 dynamic width
            height={boxSize.height}  // 👈 dynamic height
            recycle={false}      // confetti falls once
            numberOfPieces={200} // adjust particle count
          />
        )}

        {/* 👇 Traffic Police Lottie animation */}
        <div className="w-48 h-48 z-10">
          <Lottie animationData={trafficPoliceAnimation} loop={true} />
        </div>

        <div className="text-3xl font-bold mb-4 text-pink-600 animate-pulse z-10">
          🎉 You've explored all cards for today!
        </div>
        <p className="text-lg mb-4 z-10">Your daily pop-in limit has been reached.</p>
        <p className="text-md z-10">
          It will reset at <strong>12:00 AM</strong> — in{" "}
          <span className="text-yellow-900">{countdown}</span>
        </p>
      </div>
    );
  }


  // ✅ Case 2: No feed but swipes are still allowed
  if (feed.length === 0) {
    return (
      <div className="w-9/10 md:w-1/2 h-2/5 md:h-1/2 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm text-black text-xl p-10 rounded-xl shadow-xl">
        <div className="text-3xl font-bold mb-4 text-gray-600 animate-pulse">
          😕 No one to connect with right now!
        </div>

        {/* 👇 Lottie animation container */}
        <div className="w-48 h-48 my-4">
          <Lottie animationData={emptyBoxAnimation} loop={true} />
        </div>

        <p className="text-lg mb-2">Try again later — new profiles are updated regularly.</p>
        <p className="text-md text-gray-600 mt-4 animate-bounce">Keep exploring the tribe!</p>
      </div>
    );
  }

  // ✅ Case 3: Show a card if feed has data
  return (
    <div className="flex-grow flex w-full items-center justify-center">
      <div className="col-span-4 flex justify-center">
        <UserCard feed={feed[0]} isProfile={false} />
      </div>
    </div>
  );
};

export default Tribe;