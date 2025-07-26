import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // 👈 import Link

const TechBlog = () => {
  const displayMode = useSelector((state) => state.profile.displayMode);
  const mainText = displayMode === "Light" ? "text-gray-900" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-400";
  const boxText = displayMode === "Light" ? "text-gray-900" : "text-gray-300";
  const boxBg = displayMode === "Light" ? "bg-white border-gray-300" : "bg-[#1e1e1e] border-gray-700";

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <h1 className={`text-4xl md:text-5xl font-bold text-yellow-500 mb-4 ${mainText}`}>
          Tech Tribe Blog
        </h1>
        <p className={`text-lg mb-10 max-w-3xl mx-auto ${subText}`}>
          Dive into insights, stories, and ideas shaping the future of tech, community, and innovation.
          Our blog is where Tribe members and thought leaders share their perspectives.
        </p>

        {/* Placeholder / Coming Soon */}
        <div className={`rounded-xl p-8 shadow-lg border ${boxBg}`}>
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>
            🚧 Coming Soon
          </h2>
          <p className={boxText}>
            Our Tech Blog is under construction. We’re curating valuable content from developers,
            designers, and community leaders that inspire, inform, and engage.
          </p>
        </div>

        {/* Optional CTA */}
        <div className="mt-10">
          <Link
            to="/careers"
            className="inline-block bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-full text-white font-semibold"
          >
            Want to contribute? Join our team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechBlog;
