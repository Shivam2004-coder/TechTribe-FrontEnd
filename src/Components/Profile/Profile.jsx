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
    <div className="bg-gray-500 w-full flex" > {/* Removed the h-full and added min-h-full now also removed min-h-full */}
        <EditOptions />
        {/* <div className="w-full bg-black flex flex-col items-center " >  */}
        <div className="w-full bg-black flex flex-col items-center ">
          {showAvatarPage && <Accordian />}
          {showEditPage && <Edit />}
          {showPreviewPage && <PreviewPage />}
          <SaveButton />
        </div>
    </div>
  );
};

export default Profile;