import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ added

const AboutUs = () => {
  const displayMode = useSelector((store) => store.profile.displayMode);
  const headingTextColor = displayMode === "Light" ? "text-black" : "text-white";
  const subTextColor = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const paragraphTextColor = displayMode === "Light" ? "text-gray-700" : "text-gray-400";

  return (
    <div className={`min-h-screen px-6 py-12 ${headingTextColor}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">About Tech Tribe</h1>
          <p className={`text-lg ${subTextColor}`}>
            A community-driven platform where real connections begin.
          </p>
        </div>

        {/* Section: Our Purpose */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${headingTextColor}`}>Our Purpose</h2>
          <p className={`${paragraphTextColor} leading-relaxed`}>
            <span className="text-yellow-300 font-medium">Tech Tribe</span> isn't just another social app —
            it's a dedicated space where developers, tech enthusiasts, and curious minds come together to
            connect, communicate, and collaborate. Whether you're looking to find like-minded people,
            start meaningful conversations, or just expand your circle, this is the place for you.
          </p>
        </section>

        {/* Section: What Makes Us Different */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${headingTextColor}`}>What Makes Us Different</h2>
          <ul className={`list-disc list-inside space-y-3 ${paragraphTextColor}`}>
            <li>
              <span className={`font-medium ${headingTextColor}`}>Pop-in Connections</span> – A unique way to discover and connect with other users daily.
            </li>
            <li>
              <span className={`font-medium ${headingTextColor}`}>Real-Time Chat</span> – Communicate instantly with your matches through our clean and smooth chat interface.
            </li>
            <li>
              <span className={`font-medium ${headingTextColor}`}>Personalized Profiles</span> – Learn about others through rich, customizable profiles that go beyond just bios.
            </li>
            <li>
              <span className={`font-medium ${headingTextColor}`}>Interest-Based Matching</span> – Discover people who share your interests, passions, and goals.
            </li>
          </ul>
        </section>

        {/* Section: Our Vision */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${headingTextColor}`}>Our Vision</h2>
          <p className={`${paragraphTextColor} leading-relaxed`}>
            We envision a tech community that thrives on meaningful human connection.
            In a digital world often dominated by content, <span className="text-yellow-300">Tech Tribe</span> shifts the spotlight
            back to people — giving everyone a chance to be seen, heard, and understood.
          </p>
        </section>

        {/* Section: Join the Tribe */}
        <section className="bg-[#181818] rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-3 text-white">Ready to meet your tribe?</h3>
          <p className="text-gray-300 mb-4">
            Whether you're a developer looking to network, a student exploring new paths,
            or someone just curious to meet others in tech — your journey starts here.
          </p>
          <Link
            to="/tribe"
            className="inline-block mt-3 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition duration-300"
          >
            Explore Tribe
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
