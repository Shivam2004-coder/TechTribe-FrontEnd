import React from 'react';
import Logo from '../Header/Logo';

const Footer = () => {
    return (
        <footer className="bg-gray-800 w-full text-white py-1 bottom-0">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-2">
                {/* Logo/Brand Name */}
                <div className="w-6/12">
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
                <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Tech Tribe. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
