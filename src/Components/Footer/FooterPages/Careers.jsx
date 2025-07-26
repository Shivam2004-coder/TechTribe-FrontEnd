import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Add this

const Careers = () => {
  const displayMode = useSelector((store) => store.profile.displayMode); // ✅ Get mode
  const headingText = displayMode === "Light" ? "text-black" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const paraText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";

  return (
    <div className={`min-h-screen px-6 py-12 ${headingText}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Careers at Tech Tribe</h1>
          <p className={`text-lg max-w-2xl mx-auto ${subText}`}>
            We’re building a space where people connect deeply, grow personally, and thrive professionally.
          </p>
        </div>

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className={`text-2xl font-semibold mb-3 ${headingText}`}>Our Mission</h2>
          <p className={`leading-relaxed ${paraText}`}>
            At <span className="text-yellow-500 font-medium">Tech Tribe</span>, we believe meaningful human connections
            drive innovation. Our platform enables users to meet, engage, and build authentic tech communities. 
            We’re passionate about empowering people — and we’re always open to connecting with those who share that passion.
          </p>
        </section>

        {/* We're Not Hiring Right Now */}
        <section className="mb-12 text-center">
          <h2 className={`text-2xl font-semibold mb-3 ${headingText}`}>We’re Not Hiring Right Now</h2>
          <p className={`max-w-xl mx-auto ${paraText}`}>
            Currently, there are no open positions at Tech Tribe. However, we’re always on the lookout for talented individuals
            who are excited about our mission and vision.
          </p>
        </section>

        {/* Still Want to Connect? */}
        <section className="text-center mt-16">
          <h3 className={`text-xl font-semibold mb-3 ${headingText}`}>Still Want to Connect?</h3>
          <p className={`mb-4 ${paraText}`}>
            If you believe you’d be a great fit for Tech Tribe, we’d still love to hear from you.
            Send us your resume or drop us a line at 
            <span className="text-yellow-500 font-medium"> careers@techtribe.com</span>, and we’ll reach out
            when a matching opportunity arises.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-green-600 hover:bg-green-500 transition px-6 py-2 text-white rounded-full font-semibold"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Careers;
