import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PromoCode = () => {
  const displayMode = useSelector((state) => state.profile.displayMode);
  const mainText = displayMode === "Light" ? "text-gray-900" : "text-white";
  const softText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const boxText = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const boxBg = displayMode === "Light" ? "bg-white border-gray-300" : "bg-[#1e1e1e] border-gray-700";

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <h1 className={`text-4xl font-bold text-yellow-400 mb-4 ${mainText}`}>
          Promo Codes
        </h1>
        <p className={`mb-10 text-lg ${softText}`}>
          We're currently not offering any active promo codes.
        </p>

        {/* Informational Section */}
        <div className={`rounded-xl p-6 shadow-md border ${boxBg}`}>
          <p className={`mb-4 ${boxText}`}>
            At Tech Tribe, we strive to provide transparent and fair pricing to all our users. While promo codes aren't available right now, we do periodically run special campaigns and offers.
          </p>
          <p className={boxText}>
            Stay tuned for future announcements or subscribe to our newsletter to be the first to know when discounts go live.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            to="/premium"
            className="inline-block bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-full font-semibold text-white"
          >
            View Plans & Pricing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
