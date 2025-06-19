import { OnlyShowAvatarPage, OnlyShowPreviewPage } from "../../../../utils/ReduxStore/setSlice";
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

const UserAvatar = () => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dilpkrfrb'
    }
});
  

  return (
    <div
      className={`flex justify-between items-center p-2 h-12 px-4 rounded-lg cursor-pointer
        transition-all duration-300 ease-in-out shadow-md hover:shadow-lg `}
    >
      <span className="font-bold text-lg tracking-wide flex items-center text-center">
        Use Avatars
      </span>

          <div className="flex items-center space-x-2">
              <div className="avatar-group m-0 p-0 -space-x-3">
                  <div className="avatar border border-white h-10 rounded-full">
                      <div className="w-10 rounded-full">
                        {/* <img src="/boyAvatar1.jpg" alt="BoyAvatar1" /> */}
                        <div className="w-full h-full object-cover rounded-lg" >
                            <AdvancedImage cldImg={cld.image("TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_a83fe293-40ae-458d-8423-83bfec78dbbb").resize(fill().width(250).height(250))} />
                        </div>
                      </div>
                  </div>
                  <div className="avatar border border-white h-10 rounded-full">
                      <div className="w-10 rounded-full">
                        {/* <img src="/boyAvatar2.jpg" alt="BoyAvatar2" /> */}
                        <div className="w-full h-full object-cover rounded-lg" >
                            <AdvancedImage cldImg={cld.image("TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_424fc5f1-b325-4461-bac7-749391c70640").resize(fill().width(250).height(250))} />
                        </div>
                      </div>
                  </div>
                  <div className="avatar border border-white h-10 rounded-full">
                      <div className="w-10 rounded-full">
                      {/* <img src="/boyAvatar3.jpg" alt="BoyAvatar3" /> */}
                      <div className="w-full h-full object-cover rounded-lg" >
                          <AdvancedImage cldImg={cld.image("TechTribe_User_Profile_Avatar/User_Avatars/Profile_avatar_b833471e-8f1b-4fc7-82b0-caec4f8f7fee").resize(fill().width(250).height(250))} />
                      </div>
                      </div>
                  </div>
                  <div className="avatar avatar-placeholder h-12">
                      <div className="bg-neutral text-neutral-content w-10 rounded-full  border-white">
                      <span>+17</span>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  );
};

export default UserAvatar;