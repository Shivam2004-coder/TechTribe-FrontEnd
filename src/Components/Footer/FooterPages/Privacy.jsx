import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Privacy = () => {
  const displayMode = useSelector((state) => state.profile.displayMode);

  const mainText = displayMode === "Light" ? "text-gray-900" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const listText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const noteText = displayMode === "Light" ? "text-gray-700" : "text-gray-300";

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold text-yellow-500 mb-4 ${mainText}`}>Privacy Policy</h1>
          <p className={`text-lg ${subText}`}>Last updated: June 28, 2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <p className={`${listText} leading-relaxed`}>
            At <span className="text-yellow-500 font-medium">Tech Tribe</span>, your privacy is important to us. This Privacy Policy explains how we collect,
            use, and protect your personal data when you use our platform. By accessing or using Tech Tribe, you agree to the terms outlined in this policy.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>1. Information We Collect</h2>
          <ul className={`list-disc list-inside space-y-2 ${listText}`}>
            <li>Basic user info such as name, email, and contact details during account creation.</li>
            <li>Profile data including bio, images, skills, and preferences.</li>
            <li>Usage data including messages, likes, connections, and interactions.</li>
            <li>Device and location information to improve user experience.</li>
          </ul>
        </section>

        {/* Use of Data */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>2. How We Use Your Data</h2>
          <ul className={`list-disc list-inside space-y-2 ${listText}`}>
            <li>To personalize your experience and match you with relevant users.</li>
            <li>To facilitate communication and networking on the platform.</li>
            <li>To improve platform functionality, security, and support.</li>
            <li>To send occasional updates, promotions, or important service announcements.</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>3. Data Sharing & Disclosure</h2>
          <p className={`${listText} leading-relaxed`}>
            We do not sell your data. We only share your information with trusted third-party services (such as analytics or cloud hosting) necessary to
            operate Tech Tribe — always in compliance with data protection standards.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>4. Your Rights & Choices</h2>
          <ul className={`list-disc list-inside space-y-2 ${listText}`}>
            <li>You can update or delete your profile information anytime.</li>
            <li>You can request access to the data we hold about you.</li>
            <li>You can opt out of marketing emails or delete your account permanently.</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>5. Cookies & Tracking</h2>
          <p className={`${listText} leading-relaxed`}>
            We use cookies to enhance user experience and gather usage analytics. You can manage cookie preferences in your browser settings.
            Read more in our <Link to="/cookie-policy" className="text-yellow-400 underline">Cookie Policy</Link>.
          </p>
        </section>

        {/* Security */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>6. Data Security</h2>
          <p className={`${listText} leading-relaxed`}>
            We implement modern security protocols and encryption to protect your information. However, no method of transmission is 100% secure,
            and we encourage you to practice good digital hygiene.
          </p>
        </section>

        {/* Updates */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>7. Changes to This Policy</h2>
          <p className={`${listText} leading-relaxed`}>
            This policy may be updated occasionally to reflect platform or legal changes. When we do, we will notify users via email or app notification.
          </p>
        </section>

        {/* Contact Info */}
        <section className={`text-sm text-center mt-16 ${noteText}`}>
          <p>
            For privacy-related questions, feel free to contact us at{" "}
            <a href="mailto:privacy@techtribe.com" className="text-yellow-500 underline">
              privacy@techtribe.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
