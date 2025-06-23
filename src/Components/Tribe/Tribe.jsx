import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/ReduxStore/feedSlice";
import { errorMessage } from "../../utils/ShowMessage";
import UserCard from "./UserCard";
import { BASE_URL } from "../../utils/Constants/constants";
import useFetchUserProfileData from "../../CustomHooks/useFetchUserProfileData";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Tribe = () => {
  const feed = useSelector((store) => store.feed.feedContent);
  const dispatch = useDispatch();
  useFetchUserProfileData();

  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState("");
  const { width, height } = useWindowSize();

  const fetchTribeData = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/feed", { withCredentials: true });
      dispatch(addFeed(response.data));
    } catch (error) {
      errorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchTribeData();
  }, []);

  // 🎯 Countdown to midnight
  useEffect(() => {
    if (feed && feed.length === 0) {
      setShowConfetti(true);

      const interval = setInterval(() => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // today at 12:00 AM next day
        const diff = midnight - now;

        const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

        setCountdown(`${hrs}:${mins}:${secs}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [feed]);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white text-xl p-10 rounded-xl shadow-xl">
        {showConfetti && <Confetti width={width} height={height} />}
        <div className="text-3xl font-bold mb-4 text-pink-400 animate-pulse">
          🎉 You've explored all cards for today!
        </div>
        <p className="text-lg mb-4">Your daily pop-in limit has been reached.</p>
        <p className="text-md">It will reset at <strong>12:00 AM</strong> — in <span className="text-yellow-400">{countdown}</span></p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex w-full items-center justify-center">
      <div className="col-span-4 flex justify-center">
        {feed && (
          <UserCard
            feed={feed[0]}
            isProfile={false}
          />
        )}
      </div>
    </div>
  );
};

export default Tribe;
















// import axios from "axios";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../../utils/ReduxStore/feedSlice";
// import { errorMessage } from "../../utils/ShowMessage";
// import UserCard from "./UserCard";
// import { BASE_URL } from "../../utils/Constants/constants";
// import useFetchUserProfileData from "../../CustomHooks/useFetchUserProfileData";

// const Tribe = () => {
//   const feed = useSelector((store) => store.feed.feedContent);
  
//   const dispatch = useDispatch();
//   useFetchUserProfileData();
  
//   const fetchTribeData = async () => {
//     try {
//       const response = await axios.get(BASE_URL + "user/feed" , {withCredentials: true});
//       // console.log(response.data);
//       dispatch(addFeed(response.data));
//     } catch (error) {
//       errorMessage(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchTribeData();
//   } , []);

//   if (!feed) {
//     return ;
//   }

//   if (feed.length == 0) {
//     return <div className="flex items-center w-full justify-center bg-slate-500 opacity-85 text-black text-2xl" >There are no more cards left to show....</div>
//   }

//   return (
//     <div className="flex-grow flex w-full items-center justify-center " >
//       {/* <div className="col-span-4" >

//       </div> */}
//       <div className="col-span-4 flex  justify-center" >
//         { feed &&   
//             <UserCard 
//               feed={feed[0]}
//               isProfile={false}
//             />
//         }
//       </div>

//       {/* <div className="col-span-4" >

//       </div> */}
//     </div>
//   );
// };

// export default Tribe;
