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
    <div className="bg-gray-500" >
      <div className="grid grid-cols-12 h-full relative " >
        <div className="col-span-4 bg-amber-300" >
          <EditOptions />
        </div>
        <div className="col-span-8 start-5 bg-pink-500 flex items-center justify-center " >
          {showAvatarPage && <Accordian />}
          {showEditPage && <Edit />}
          {showPreviewPage && <PreviewPage />}
          
        </div>
      </div>
      <SaveButton />
    </div>
  );
};

export default Profile;