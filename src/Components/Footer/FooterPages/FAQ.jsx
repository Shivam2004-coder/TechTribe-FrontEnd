import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const faqData = [
  {
    question: "What is Tech Tribe?",
    answer:
      "Tech Tribe is a social platform where tech enthusiasts, developers, and creators connect, chat, and grow together. It's designed to build real, meaningful relationships in the tech space.",
  },
  {
    question: "Who can join Tech Tribe?",
    answer:
      "Anyone with an interest in technology, coding, product design, or related fields is welcome to join. Whether you're a beginner or a professional, there's a place for you here.",
  },
  {
    question: "Is Tech Tribe free to use?",
    answer:
      "Yes, Tech Tribe offers a free tier for all users. However, premium plans are available that unlock additional features like unlimited connections, profile boosts, and badge recognition.",
  },
  {
    question: "How do I connect with other members?",
    answer:
      "You can browse profiles, send connection requests, and chat securely within the platform. We also encourage participating in community events and discussions.",
  },
  {
    question: "Can I use Tech Tribe on mobile devices?",
    answer:
      "Absolutely. Tech Tribe is fully responsive and works smoothly across desktops, tablets, and mobile devices.",
  },
  {
    question: "How do I report inappropriate behavior?",
    answer:
      "We take community safety seriously. You can report users directly through their profile or contact us at support@techtribe.com. All reports are handled confidentially.",
  },
];

const FAQ = () => {
  const displayMode = useSelector((store) => store.profile.displayMode);

  // Text color mappings
  const headingText = displayMode === "Light" ? "text-black" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const answerText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const footerText = displayMode === "Light" ? "text-gray-600" : "text-gray-400";

  // Box background based on mode
  const boxBg =
    displayMode === "Light"
      ? "bg-white border border-gray-300"
      : "bg-[#1c1c1c] border border-gray-700";

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-yellow-400 mb-4 ${headingText}`}>
            Frequently Asked Questions
          </h1>
          <p className={`text-lg ${subText}`}>
            Got questions? We've got answers. Here’s everything you need to
            know about Tech Tribe.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-8">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`${boxBg} rounded-xl p-6 shadow-sm hover:shadow-md transition`}
            >
              <h2 className="text-xl font-semibold text-yellow-500 mb-2">
                {item.question}
              </h2>
              <p className={`${answerText} leading-relaxed`}>{item.answer}</p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className={`text-sm ${footerText}`}>
            Still have questions? Reach out{" "}
            <Link to="/contact" className="text-yellow-400 hover:underline">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
