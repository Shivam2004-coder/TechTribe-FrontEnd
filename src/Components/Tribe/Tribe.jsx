import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/ReduxStore/feedSlice";
import { errorMessage } from "../../utils/ShowMessage";
import UserCard from "./UserCard";
import { BASE_URL } from "../../utils/Constants/constants";

const Tribe = () => {
  const feed = useSelector((store) => store.feed.feedContent);
  
  const dispatch = useDispatch();
  
  const fetchTribeData = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/feed" , {withCredentials: true});
      console.log(response.data);
      dispatch(addFeed(response.data));
    } catch (error) {
      errorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchTribeData();
  } , []);

  if (!feed) {
    return ;
  }

  if (feed.length == 0) {
    return <div className="flex items-center justify-center bg-slate-500 opacity-85 text-black text-2xl" >There are no more cards left to show....</div>
  }

  return (
    <div className="h-full w-full justify-center grid grid-cols-12 " >
      <div className="col-span-4" >

      </div>
      <div className="col-span-4 flex justify-center" >
        { feed &&   
            <UserCard 
              feed={feed[0]}
            />
        }
      </div>

      <div className="col-span-4" >

      </div>
    </div>
  );
};

export default Tribe;
