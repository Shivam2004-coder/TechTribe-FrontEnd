import React from "react";

const Logo = () => {
    return (
        <div
            className="font-bold text-2xl text-white rounded-lg 
                       hover:bg-gray-900 
                       hover:shadow hover:shadow-black
                       active:bg-gray-700 active:shadow
                       p-2
                       w-6/12
                       mx-4
                       flex justify-center
                       cursor-pointer"
        >
            <img 
                src="/TechTribeLogo1.jpeg" 
                alt="WebsiteLogo" 
                className="h-9 w-9 rounded-sm mx-1 shadow shadow-black"
            />
            <h1>Tech Tribe</h1>
        </div>
    );
};

export default Logo;
