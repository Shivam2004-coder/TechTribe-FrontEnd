import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Terms = () => {
  const displayMode = useSelector((state) => state.profile.displayMode);
  const mainText = displayMode === "Light" ? "text-gray-900" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-400";

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className={`text-4xl md:text-5xl font-bold text-yellow-400 mb-6 text-center ${mainText}`}>
          Terms and Conditions
        </h1>
        <p className={`text-center mb-12 max-w-3xl mx-auto ${subText}`}>
          These Terms of Service govern your use of Tech Tribe and its features. Please read them carefully before using our platform.
        </p>

        {/* Sections */}
        {[
          {
            title: "1. Acceptance of Terms",
            content:
              "By accessing or using the Tech Tribe platform, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the platform...",
          },
          {
            title: "2. Eligibility",
            content:
              "You must be at least 18 years old to use Tech Tribe. By using the platform, you represent and warrant...",
          },
          {
            title: "3. User Conduct",
            list: [
              "Respect other members of the community...",
              "Do not engage in harassment...",
              "Do not impersonate...",
              "Use the platform for its intended purpose...",
              "Refrain from sending spam...",
            ],
          },
          {
            title: "4. Content Ownership",
            content:
              "You retain ownership of the content you post, but by sharing it on Tech Tribe, you grant us a license...",
          },
          {
            title: "5. Account Security",
            content:
              "You are responsible for maintaining the confidentiality of your login credentials...",
          },
          {
            title: "6. Payments and Subscriptions",
            content:
              "Certain features of Tech Tribe may require a subscription. All pricing is displayed in INR...",
          },
          {
            title: "7. Termination",
            content:
              "We reserve the right to suspend or terminate your access to Tech Tribe at our sole discretion...",
          },
          {
            title: "8. Platform Changes",
            content:
              "We reserve the right to update, modify, or discontinue any part of the platform at any time...",
          },
          {
            title: "9. Disclaimer & Limitation of Liability",
            content:
              "Tech Tribe is provided “as is” without warranties of any kind. In no event shall Tech Tribe be liable for any indirect...",
          },
          {
            title: "10. Governing Law",
            content:
              "These Terms are governed by the laws of India. Any disputes arising shall be resolved in Bangalore courts.",
          },
        ].map((sec, idx) => (
          <section key={idx} className="mb-10">
            <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>
              {sec.title}
            </h2>
            {sec.content && (
              <p className={`leading-relaxed ${subText}`}>{sec.content}</p>
            )}
            {sec.list && (
              <ul className={`list-disc list-inside space-y-2 leading-relaxed ${subText}`}>
                {sec.list.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Contact Section */}
        <section className="text-center mt-16">
          <h2 className={`text-xl font-semibold mb-2 ${mainText}`}>Questions?</h2>
          <p className={`${subText}`}>
            If you have any questions about these Terms or our platform, please reach out to us{" "}
            <Link to="/contact" className="text-yellow-400 underline">
              here
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
