import React from 'react';
import Logo from '../Header/Logo';
import { useSelector } from 'react-redux';

const Footer = () => {


    const displayMode = useSelector((store) => store.profile.displayMode);

    // const style = displayMode === "Light" ? "bg-white text-black" : "bg-gray-800 text-white";

    return (
        <footer className={` w-full py-1 bottom-0 `}>
            <div className=" mx-auto flex flex-col justify-between items-center px-2">
                {/* Logo/Brand Name */}
                {/* <div className="w-6/12">
                    <Logo />
                </div> */}
                <div className="
                        mx-2
                        my-2
                        bg-blue-950 
                        lg:w-3/12
                        md:w-2/12
                        w-5/12
                        flex 
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
                    style={{
                    backgroundColor: "rgb(0, 49, 255)"  
                    }}
                >
                <Logo />
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition text-xl">
                        {/* <FaTwitter /> */}
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition text-xl">
                        {/* <FaGithub /> */}
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition text-xl">
                        {/* <FaLinkedin /> */}
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
            <div className="text-center mt-4">
                <p className={`${ displayMode === "Light" ? "text-black" : "text-white" } text-sm`}>© {new Date().getFullYear()} Tech Tribe. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
