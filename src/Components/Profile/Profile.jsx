import React from "react";
import EditOptions from "./EditOptions/EditOptions";
import Edit from "./Edit/Edit";
import { useSelector } from "react-redux";
import PreviewPage from "./PreviewPage/PreviewPage";
import Accordian from "./Accordian/Accordian";

const Profile = () => {

  const showAvatarPage = useSelector((store) => store.set.showAvatarPage);
  const showEditPage = useSelector((store) => store.set.showEditPage);
  const showPreviewPage = useSelector((store) => store.set.showPreviewPage);
  

  return (
    <div className="relative min-h-screen w-full bg-gray-500 flex">
      <div className="absolute left-0 top-0 h-full z-10">
        <EditOptions />
      </div>
      <div className="ml-16 w-full bg-black flex flex-col items-center transition-all duration-300 ease-in-out">
        {showAvatarPage && <Accordian />}
        {showEditPage && <Edit />}
        {showPreviewPage && <PreviewPage />}
      </div>
    </div>

  );
};

export default Profile;