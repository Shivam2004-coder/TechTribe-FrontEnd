import React from "react";
import { useSelector } from "react-redux";

const IntellectualProperty = () => {
  const displayMode = useSelector((store) => store.profile.displayMode);

  // Choose text colors based on display mode
  const mainText = displayMode === "Light" ? "text-gray-800" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const lightText = displayMode === "Light" ? "text-gray-600" : "text-gray-500";

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold text-yellow-400 mb-4 ${mainText}`}>
            Intellectual Property Policy
          </h1>
          <p className={`text-lg ${subText}`}>
            Protecting creativity, respecting ownership, and fostering innovation within the Tech Tribe community.
          </p>
        </div>

        {/* Sections */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>1. Ownership</h2>
          <p className={`${subText} leading-relaxed`}>
            All content on the Tech Tribe platform — including logos, brand assets, design elements, written content,
            and code — is the intellectual property of Tech Tribe unless otherwise stated. Unauthorized use,
            reproduction, or distribution of our content without written permission is strictly prohibited.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>2. User-Generated Content</h2>
          <p className={`${subText} leading-relaxed`}>
            By posting content (e.g., messages, images, code snippets, or designs) on Tech Tribe, users grant us a non-exclusive,
            royalty-free license to use, display, and share that content as part of the platform's operation and promotion.
            However, users retain full ownership of their intellectual property.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>3. Respecting Third-Party Rights</h2>
          <p className={`${subText} leading-relaxed`}>
            We expect all users to respect copyrights, trademarks, and other proprietary rights of third parties.
            Posting content that infringes on the rights of others is strictly forbidden and may result in suspension or removal.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>4. Reporting Violations</h2>
          <p className={`${subText} leading-relaxed`}>
            If you believe that your intellectual property rights have been violated on our platform,
            please contact us at{" "}
            <a href="mailto:legal@techtribe.com" className="text-yellow-400 underline">
              legal@techtribe.com
            </a>{" "}
            with detailed information and supporting evidence. We take these reports seriously and will act swiftly.
          </p>
        </section>

        {/* Final Note */}
        <section className={`text-sm text-center mt-12 ${lightText}`}>
          <p>
            This policy was last updated on{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default IntellectualProperty;
