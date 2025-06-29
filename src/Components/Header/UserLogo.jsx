import React, { useRef, useEffect } from "react";
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import Menu from "./Menu";
// import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../utils/ReduxStore/setSlice";

const UserLogo = () => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const iconRef = useRef(null); // Ref for the user icon
    const profileImage = useSelector((store) => store.profile.profileImage);
    const displayMode = useSelector((store) => store.profile.displayMode);
    const showMenu = useSelector((store) => store.set.showMenu);

    const handleUserIconClick = (event) => {
        // Prevent the click event from bubbling up
        event.stopPropagation();
        // Toggle the menu state
        dispatch(toggleMenu(true));
    };

    // Close the menu if clicked outside of the menu and user icon
    const handleClickOutside = (event) => {
        // Check if the click is outside both the menu and the user icon
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            iconRef.current && !iconRef.current.contains(event.target)
        ) {
            dispatch(toggleMenu(false));
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full  md:w-1/12 h-full flex items-center justify-center ">
            <div
                className={`
                            transition-opacity 
                            duration-300 
                            ease-in-out 
                            ${showMenu ? "opacity-0" : "opacity-100"} 
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
            {showMenu && (
                <div
                    ref={menuRef}
                    className={` ${displayMode === "Light" ? "bg-white text-black" : "bg-gray-800 text-white" }  rounded-tl-lg rounded-bl-lg
                                shadow-xl shadow-black
                                absolute top-0 
                                right-0 animate-expand-menu origin-right
                                text-sm`}
                    style={{ zIndex: 999 }}
                >
                    <Menu />
                </div>
            )}
        </div>
    );
};

export default UserLogo;