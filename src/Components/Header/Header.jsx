import Logo from "./Logo";
import NavOptions from "./NavOptions";
import UserLogo from "./UserLogo";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Header = () => {
  const profile = useSelector((store) => store.profile);
  const location = useLocation();
  const showMenu = useSelector((store) => store.set.showMenu);
  const isProfileEmpty = () => {
    if ( location === "/onboarding" ) {
      return false;
    }
    return profile && profile.emailId;
  };
  

  // ${profile.displayMode === "Light" ? "bg-white text-black" : "bg-black" }
  return (
    // <div className={`flex items-center top-0 justify-between h-20 bg-white/40 backdrop-blur-xs w-full z-20 shadow-[inset_0_-8px_12px_rgba(0,0,0,0.3)]`}>
    <div className={`relative flex items-center top-0 justify-between h-20  w-full z-20 `}>
      {/* Blur Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"
        }}
      >
      </div>

      <div className="
                mx-2
                my-2
                lg:w-3/12
                md:w-2/12
                w-5/12
                flex 
                z-20
                items-center 
                justify-center
                font-bold 
                rounded-full
                active:scale-95 
                transition
                duration-150 
                ease-in-out
                select-none       
                "
          // style={{
          //   backgroundColor: "rgb(0, 49, 255)"  
          // }}
      >
        <Logo />
      </div>
      { isProfileEmpty() &&
        <div className="
                relative
                flex 
                h-full 
                items-center 
                md:w-9/12
                w-8/12 
                justify-end
                "
        >
          {!showMenu && <NavOptions />}
          <UserLogo />
        </div>
      }
    </div>
  );
};

export default Header;
