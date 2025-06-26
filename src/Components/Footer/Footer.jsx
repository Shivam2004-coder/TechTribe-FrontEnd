import React from "react";
import { useSelector } from "react-redux";
import Logo from "../Header/Logo";

const Footer = () => {
  const displayMode = useSelector((store) => store.profile.displayMode);
  const textColor = displayMode === "Light" ? "text-black" : "text-white";
  const borderColor = displayMode === "Light" ? "border-gray-300" : "border-gray-700";

  return (
    <footer className={`w-full bg-white/30 px-4 py-8 ${textColor} backdrop-blur-md `}>

      {/* Grid Sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            <li><a href="#" className="hover:underline">Intellectual Property</a></li>
          </ul>
        </div>

        {/* Careers */}
        <div>
          <h3 className="font-semibold mb-2">Careers</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Careers Portal</a></li>
            <li><a href="#" className="hover:underline">Tech Blog</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-2">Social</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter hover:text-gray-400"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github hover:text-gray-400"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin hover:text-gray-400"></i>
            </a>
          </div>
        </div>

        {/* More */}
        <div>
          <h3 className="font-semibold mb-2">More</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Press Room</a></li>
            <li><a href="#" className="hover:underline">Promo Code</a></li>
          </ul>
        </div>
      </div>

      {/* Paragraph */}
      <div className="max-w-4xl mx-auto mt-10 text-xs text-center leading-relaxed">
        <p>
          Tech Tribe is your space for connection, growth, and exploration. Whether you’re looking to discover insightful articles,
          read trending news, or explore your next favorite book, we’ve got you covered. Our platform brings people of all backgrounds together to engage,
          learn, and stay informed — all in one place. Join the tribe that thrives on curiosity, creativity, and community.
        </p>
      </div>

      {/* Divider */}
      <div className={`my-6 border-t ${borderColor}`}></div>

      {/* Footer Bottom Line */}
      <div className="text-center text-xs">
        <p>© {new Date().getFullYear()} Tech Tribe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

















// import React from 'react';
// import Logo from '../Header/Logo';
// import { useSelector } from 'react-redux';

// const Footer = () => {


//     const displayMode = useSelector((store) => store.profile.displayMode);

//     // const style = displayMode === "Light" ? "bg-white text-black" : "bg-gray-800 text-white";

//     return (
//         <footer className={` w-full py-1 bottom-0 h-80  `}>
//             <div className=" mx-auto flex flex-col justify-between items-center px-2">
//                 {/* Logo/Brand Name */}
//                 {/* <div className="w-6/12">
//                     <Logo />
//                 </div> */}
//                 <div className="
//                         mx-2
//                         my-2
//                         bg-blue-950 
//                         lg:w-3/12
//                         md:w-2/12
//                         w-5/12
//                         flex 
//                         items-center 
//                         justify-center
//                         font-bold 
//                         rounded-full
//                         active:scale-95 
//                         transition
//                         duration-150 
//                         ease-in-out
//                         select-none       
//                         "
//                     style={{
//                     backgroundColor: "rgb(0, 49, 255)"  
//                     }}
//                 >
//                 <Logo />
//                 </div>

//                 {/* Social Media Icons */}
//                 <div className="flex space-x-4">
//                     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition text-xl">
//                         {/* <FaTwitter /> */}
//                         <i className="fa-brands fa-x-twitter"></i>
//                     </a>
//                     <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition text-xl">
//                         {/* <FaGithub /> */}
//                         <i className="fa-brands fa-github"></i>
//                     </a>
//                     <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition text-xl">
//                         {/* <FaLinkedin /> */}
//                         <i className="fa-brands fa-linkedin"></i>
//                     </a>
//                 </div>
//             </div>
//             <div className="text-center mt-4">
//                 <p className={`${ displayMode === "Light" ? "text-black" : "text-white" } text-sm`}>© {new Date().getFullYear()} Tech Tribe. All rights reserved.</p>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
