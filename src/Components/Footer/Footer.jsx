import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // 👈 Import Link
import Logo from "../Header/Logo";

const Footer = () => {
  const displayMode = useSelector((store) => store.profile.displayMode);
  const borderColor = displayMode === "Light" ? "border-gray-300" : "border-gray-700";
  const bgColor = displayMode === "Light" ? "bg-white text-black" : "bg-black text-white" ;

  return (
    <footer className={`w-full px-4 py-8 ${bgColor} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        
        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li><Link to="/privacy" className="hover:underline">Privacy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms</Link></li>
            <li><Link to="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
            <li><Link to="/intellectual-property" className="hover:underline">Intellectual Property</Link></li>
          </ul>
        </div>

        {/* Careers */}
        <div>
          <h3 className="font-semibold mb-2">Careers</h3>
          <ul className="space-y-1">
            <li><Link to="/careers" className="hover:underline">Careers Portal</Link></li>
            <li><Link to="/tech-blog" className="hover:underline">Tech Blog</Link></li>
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
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/press-room" className="hover:underline">Press Room</Link></li>
            <li><Link to="/promo-code" className="hover:underline">Promo Code</Link></li>
          </ul>
        </div>
      </div>

      {/* Paragraph and Footer Info */}
      <div className="max-w-4xl mx-auto mt-10 text-xs text-center leading-relaxed">
        <p>
          Tech Tribe is your space for connection, growth, and exploration. Whether you’re looking to discover insightful articles,
          read trending news, or explore your next favorite book, we’ve got you covered. Our platform brings people of all backgrounds together to engage,
          learn, and stay informed — all in one place. Join the tribe that thrives on curiosity, creativity, and community.
        </p>
      </div>

      <div className={`my-6 border-t ${borderColor}`}></div>

      <div className="text-center text-xs">
        <p>© {new Date().getFullYear()} Tech Tribe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
