import React, { useState, useRef, useEffect } from "react";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const UserLogo = () => {
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
        <div className="mr-2">
            <div
                className="relative p-0.5 hover:bg-gray-300 hover:rounded-full"
                onClick={handleUserIconClick}
                ref={iconRef} // Attach ref to user icon
            >
                <img
                    src={profileImage}
                    alt="This is User Logo !!"
                    className="rounded-full h-15 w-15 bg-gray-300 cursor-pointer object-cover"
                />
            </div>
            {isClicked && (
                <div ref={menuRef}>
                    <Menu />
                </div>
            )}
        </div>
    );
};

export default UserLogo;