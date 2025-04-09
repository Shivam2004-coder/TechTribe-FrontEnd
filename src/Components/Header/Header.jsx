import React from "react";
import Logo from "./Logo";
import NavOptions from "./NavOptions";
import UserLogo from "./UserLogo";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Header = () => {
  // const user = useSelector((store) => store.user.userContent);
  const profile = useSelector((store) => store.profile);
  const location = useLocation();

  const isProfileEmpty = () => {
    if ( location === "/onboarding" ) {
      return false;
    }
    return profile && profile.emailId;
  };
  
  return (
    <div className="sticky z-20 flex items-center top-0 justify-between h-16 bg-gray-500 w-full opacity-95">
      <div className="
                bg-blue-700 
                h-full 
                w-4/12 
                flex 
                items-center 
                font-bold 
                clip-slash
                shadow-inner
                shadow-black"
      >
        <Logo />
      </div>
      { isProfileEmpty() &&
        <div className="
                relative
                flex 
                h-full 
                items-center 
                w-5/12 
                justify-around
                "
        >
          <NavOptions />
          <UserLogo />
        </div>
      }
    </div>
  );
};

export default Header;
