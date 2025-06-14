import React, { useRef, useEffect } from "react";
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import Menu from "./Menu";
// import DropDown from "./DropDown";
import { useSelector } from "react-redux";

const UserLogo = ({isClicked, setIsClicked}) => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const menuRef = useRef(null);
    const iconRef = useRef(null); // Ref for the user icon
    const profileImage = useSelector((store) => store.profile.profileImage);

    const handleUserIconClick = (event) => {
        // Prevent the click event from bubbling up
        event.stopPropagation();
        // Toggle the menu state
        setIsClicked((prev) => !prev);
    };

    // Close the menu if clicked outside of the menu and user icon
    const handleClickOutside = (event) => {
        // Check if the click is outside both the menu and the user icon
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            iconRef.current && !iconRef.current.contains(event.target)
        ) {
            setIsClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-3/12 md:w-1/12 h-full flex items-center justify-center relative">
            <div
                className={`
                            absolute
                            transition-opacity 
                            duration-300 
                            ease-in-out 
                            ${isClicked ? "opacity-0" : "opacity-100"} 
                            hover:bg-gray-300
                            rounded-4xl
                            cursor-pointer`}
                onClick={handleUserIconClick}
                ref={iconRef} // Attach ref to user icon
            >
                {/* <div  > */}
                    <AdvancedImage cldImg={cld.image(profileImage).resize(fill().width(250).height(250))} 
                                    className="h-8 w-8 md:h-12 md:w-12 object-cover rounded-3xl"
                    />
                {/* </div> */}
            </div>
            {isClicked && (
                <div
                    ref={menuRef}
                    // className="absolute top-full right-0 mt-2 z-50 animate-slide-in-right"
                    className="bg-white text-black rounded-tl-lg rounded-bl-lg
                                shadow-xl shadow-black
                                absolute top-0 
                                right-0 z-50 animate-expand-menu origin-right
                                text-sm"
                >
                    <Menu setIsClicked={setIsClicked} />
                </div>
            )}
            {/* { isClicked && (
                <div ref={menuRef}>
                    <Menu />
                </div>
            )} */}
        </div>
    );
};

export default UserLogo;