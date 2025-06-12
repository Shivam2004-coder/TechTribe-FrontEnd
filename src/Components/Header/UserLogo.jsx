import React, { useState, useRef, useEffect } from "react";
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import Menu from "./Menu";
// import DropDown from "./DropDown";
import { useSelector } from "react-redux";

const UserLogo = () => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const [isClicked, setIsClicked] = useState(false);
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
        <div className="w-2/12 h-full flex items-center justify-around relative">
            <div
                className={`
                            absolute 
                            p-0.5 
                            transition-opacity 
                            duration-300 
                            ease-in-out 
                            ${isClicked ? "opacity-0" : "opacity-100"} 
                            hover:bg-gray-300`}
                onClick={handleUserIconClick}
                ref={iconRef} // Attach ref to user icon
            >
                <div className="h-15 w-15 object-cover rounded-lg" >
                    <AdvancedImage cldImg={cld.image(profileImage).resize(fill().width(250).height(250))} />
                </div>
            </div>
            {isClicked && (
                <div
                    ref={menuRef}
                    // className="absolute top-full right-0 mt-2 z-50 animate-slide-in-right"
                    className="absolute top-0 right-0 z-50 animate-expand-menu origin-right"
                >
                    <Menu />
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