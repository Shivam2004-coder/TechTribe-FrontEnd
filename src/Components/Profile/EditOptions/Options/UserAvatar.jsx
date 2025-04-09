import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnlyShowAvatarPage, OnlyShowPreviewPage } from "../../../../utils/ReduxStore/setSlice";

const UserAvatar = () => {
  const showAvatarPage = useSelector((store) => store.set.showAvatarPage);
  const dispatch = useDispatch();

  const handleChooseAvatarClick = () => {
      dispatch(OnlyShowAvatarPage());
  };

  return (
    <>
      <div
        className={`bg-yellow-950 flex justify-between items-center p-2 h-15 px-4 rounded-lg cursor-pointer
          transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:bg-yellow-900 `}
        onClick={handleChooseAvatarClick}
      >
        <span className="text-white font-semibold text-lg tracking-wide flex items-center text-center">
          Use Avatars
        </span>

            <div className="flex items-center space-x-2">
                <div className="avatar-group m-0 p-0 -space-x-3">
                    <div className="avatar border border-white h-10 rounded-full">
                        <div className="w-10 rounded-full">
                        <img src="/boyAvatar1.jpg" alt="BoyAvatar1" />
                        </div>
                    </div>
                    <div className="avatar border border-white h-10 rounded-full">
                        <div className="w-10 rounded-full">
                        <img src="/boyAvatar2.jpg" alt="BoyAvatar2" />
                        </div>
                    </div>
                    <div className="avatar border border-white h-10 rounded-full">
                        <div className="w-10 rounded-full">
                        <img src="/boyAvatar3.jpg" alt="BoyAvatar3" />
                        </div>
                    </div>
                    <div className="avatar avatar-placeholder h-12">
                        <div className="bg-neutral text-neutral-content w-10 rounded-full  border-white">
                        <span>+17</span>
                        </div>
                    </div>
                </div>
            </div>



        { showAvatarPage ?
          <div className="bg-white rounded-full h-9 w-2 font-extrabold" >
            
          </div>
          :
          <div className="bg-yellow-950 rounded-full h-6 w-2 font-extrabold " >
            
          </div>

        }
      </div>
    </>
  );
};

export default UserAvatar;