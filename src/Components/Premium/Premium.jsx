import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants/constants";

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Browse developers",
      "Limited daily swipes",
      "Basic profile visibility"
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: [
      "Unlimited swipes",
      "Priority profile placement",
      "See who liked you",
      "Ad-free experience",
    ],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$19.99/mo",
    features: [
      "All Pro features",
      "Verified badge",
      "DM without matching",
      "Exclusive Dev Events",
    ],
    cta: "Become Elite",
    highlight: false,
  },
];


const Premium = () => {
  const [isPremiumMember, setIsPremiumMember] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  } , []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "payment/verify", {
      withCredentials: true,
    });

    if (res.data.isPremiumMember) {
      setIsPremiumMember(true);
    }

  }

  const handlePaymentButtonClick = async (type) => {
    console.log("Payment button clicked for type:", type);
    const order = await axios.post(BASE_URL + "payment/create", 
      {
        membershipType: type,
      },
      {
        withCredentials: true,
      }
    );

    // now we should open the RazorPay pop-up for payment
    const { amount , currency , keyId , notes , orderId } = order.data;
    const options = {
      key: keyId, 
      amount, 
      currency, 
      name: "TechTribe",
      description: 'Membership for ' + order.data.notes.membershipType,
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  };




  return (
    isPremiumMember ? "YOU ARE ALREADY A PREMIUM MEMBER" : (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upgrade to <span className="text-yellow-400">Premium</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Unlock exclusive features, boost your visibility, and connect with the best devs out there.
        </p>
      </section>

      {/* Pricing Plans */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-20">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-2xl shadow-xl p-6 border transition-transform transform hover:scale-105 ${
              plan.highlight
                ? "bg-yellow-400 text-black border-yellow-300"
                : "bg-gray-500 bg-opacity-10 border-gray-600 border-opacity-20"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-xl font-semibold transition duration-200 ${
                plan.highlight
                  ? "bg-black hover:bg-gray-800 text-white"
                  : "bg-yellow-400 hover:bg-yellow-300 text-black"
              }`}
              onClick={() => handlePaymentButtonClick("gold")}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </section>
    </div> )
  );
};

export default Premium;
