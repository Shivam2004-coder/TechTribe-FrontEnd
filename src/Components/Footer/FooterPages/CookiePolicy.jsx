import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ to read displayMode

const CookiePolicy = () => {
  const displayMode = useSelector((store) => store.profile.displayMode); // ✅ get the current mode

  // ✅ Text color logic
  const headingText = displayMode === "Light" ? "text-black" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const paraText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const noteText = displayMode === "Light" ? "text-gray-700" : "text-gray-300";

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold text-yellow-500 mb-4 ${headingText}`}>
            Cookie Policy
          </h1>
          <p className={`text-lg ${subText}`}>
            This Cookie Policy explains how Tech Tribe uses cookies and similar
            technologies when you visit or use our platform.
          </p>
        </div>

        {/* Section: What Are Cookies */}
        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-3 ${headingText}`}>What Are Cookies?</h2>
          <p className={`${paraText} leading-relaxed`}>
            Cookies are small text files that are placed on your device to help
            websites and apps remember things about you. They are used for a
            variety of reasons like improving your browsing experience,
            remembering your preferences, or analyzing usage patterns.
          </p>
        </section>

        {/* Section: How We Use Cookies */}
        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-3 ${headingText}`}>How We Use Cookies</h2>
          <ul className={`list-disc list-inside space-y-2 ${paraText}`}>
            <li>
              <span className={`${headingText} font-medium`}>Essential Cookies:</span>{" "}
              Required for basic functionality like login and navigation.
            </li>
            <li>
              <span className={`${headingText} font-medium`}>Analytics Cookies:</span>{" "}
              Help us understand how users interact with our site so we can improve.
            </li>
            <li>
              <span className={`${headingText} font-medium`}>Preference Cookies:</span>{" "}
              Store your theme or language preferences for a better experience.
            </li>
            <li>
              <span className={`${headingText} font-medium`}>Marketing Cookies:</span>{" "}
              Used to deliver relevant ads and measure performance of ad campaigns.
            </li>
          </ul>
        </section>

        {/* Section: Managing Cookies */}
        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-3 ${headingText}`}>Managing Your Cookies</h2>
          <p className={`${paraText} leading-relaxed`}>
            You can modify your browser settings to block or delete cookies.
            However, please note that some features of Tech Tribe may not
            function properly without essential cookies.
          </p>
        </section>

        {/* Section: Updates */}
        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-3 ${headingText}`}>Policy Updates</h2>
          <p className={`${paraText} leading-relaxed`}>
            We may update this Cookie Policy from time to time to reflect
            changes in technology, legislation, or our practices. When we do, we
            will update the “Last Updated” date at the bottom of this page.
          </p>
        </section>

        {/* Section: Contact Us */}
        <section className="mt-12 text-center">
          <p className={subText}>
            If you have any questions about this Cookie Policy, feel free to
            reach out{" "}
            <Link to="/contact" className="text-yellow-500 hover:underline">
              here
            </Link>
            .
          </p>
          <p className={`text-sm mt-4 ${noteText}`}>Last Updated: June 28, 2025</p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
