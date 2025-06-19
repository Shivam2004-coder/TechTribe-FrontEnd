import React from "react";
import EditOptions from "./EditOptions/EditOptions";
import Edit from "./Edit/Edit";
import { useSelector } from "react-redux";
import PreviewPage from "./PreviewPage/PreviewPage";
import Accordian from "./Accordian/Accordian";
import SaveButton from "./SaveButton/SaveButton";

const Profile = () => {

  const showAvatarPage = useSelector((store) => store.set.showAvatarPage);
  const showEditPage = useSelector((store) => store.set.showEditPage);
  const showPreviewPage = useSelector((store) => store.set.showPreviewPage);
  

  return (
    <div className="bg-gray-500 h-full w-full" >
      <div className="w-full h-full relative flex" >
        {/* <div className="w-4/12 bg-amber-300 " > */}
          <EditOptions />
        {/* </div> */}
        <div className="w-8/12 bg-pink-500 flex items-center justify-center " >
          {showAvatarPage && <Accordian />}
          {showEditPage && <Edit />}
          {showPreviewPage && <PreviewPage />}
          
          <SaveButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;