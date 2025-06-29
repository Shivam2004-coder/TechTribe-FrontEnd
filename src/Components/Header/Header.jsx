import Logo from "./Logo";
import NavOptions from "./NavOptions";
import UserLogo from "./UserLogo";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Header = () => {
  const profile = useSelector((store) => store.profile);
  const location = useLocation();
  const showMenu = useSelector((store) => store.set.showMenu);
  const showProfileMenu = useSelector((store) => store.set.showProfileMenu);
  const showSettingsMenu = useSelector((store) => store.set.showSettingsMenu); 
  const isProfileEmpty = () => {
    if ( location === "/onboarding" ) {
      return false;
    }
    return profile && profile.emailId;
  };
  

  // ${profile.displayMode === "Light" ? "bg-white text-black" : "bg-black" }
  return (
    // <div className={`flex items-center top-0 justify-between h-20 bg-white/40 backdrop-blur-xs w-full z-20 shadow-[inset_0_-8px_12px_rgba(0,0,0,0.3)]`}>
    <div className={`relative flex items-center top-0 justify-between h-20  w-full `}>
      {/* Blur Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))"
        }}
      >

      </div>

      <div className={`
                mx-2
                my-2
                lg:w-4/12
                md:w-4/12
                w-full
                ${ showProfileMenu || showSettingsMenu ? "opacity-0" : "opacity-100" }
                z-20
                items-center 
                font-bold 
                rounded-full
                active:scale-95 
                transition
                duration-150 
                ease-in-out
                select-none       
                `}
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
                md:w-7/12
                w-2/12 
                md:justify-end
                justify-center
                "
        >
          {/* NavOptions will be hidden on small screens and shown from md and above */}
          {!showMenu && (
            <div className="hidden md:flex h-full w-full items-center justify-end p-0">
              <NavOptions />
            </div>
          )}
          <UserLogo />
        </div>
      }
    </div>
  );
};

export default Header;
