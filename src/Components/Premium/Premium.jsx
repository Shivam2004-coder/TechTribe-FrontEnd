// This is a heavily enhanced version of your Premium component with interactive
// selection, animated tab switches, and dynamic pricing options display.
// Assumes Tailwind CSS is available.

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants/constants";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useSelector } from "react-redux";

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Browse developers",
      "Daily pop-in limit : 30",
      "Chat with connections"
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: [
      "Daily pop-in limit : 100",
      "See whom you liked",
      "Pro badge",
    ],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$19.99/mo",
    features: [
      "Priority profile placement",
      "Unlimilted pop-in",
      "Elite badge",
      "See whom you liked",
      "See whom you ignored",
    ],
    cta: "Become Elite",
    highlight: false,
  },
];

const priceOptions = {
  Pro: {
    weekly: [
      { label: "1 Week", price: "₹199", amount: 19900, tag: "Popular" },
      { label: "3 Weeks", price: "₹149/week", amount: 44700, tag: "Saves 25%" }
    ],
    monthly: [
      { label: "1 Month", price: "₹499", amount: 49900, tag: "Saves 20%" },
      { label: "3 Months", price: "₹399/month", amount: 119700, tag: "Saves 35%" },
      { label: "6 Months", price: "₹349/month", amount: 209400, tag: "Best Value" }
    ]
  },
  Elite: {
    weekly: [
      { label: "1 Week", price: "₹299", amount: 29900, tag: "Popular" },
      { label: "3 Weeks", price: "₹229/week", amount: 68700, tag: "Saves 23%" }
    ],
    monthly: [
      { label: "1 Month", price: "₹699", amount: 69900, tag: "Saves 20%" },
      { label: "3 Months", price: "₹599/month", amount: 179700, tag: "Saves 35%" },
      { label: "6 Months", price: "₹499/month", amount: 299400, tag: "Best Value" }
    ]
  }
};


const Premium = () => {
  const membershipType = useSelector((store) => store.profile.membershipType);
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [billingCycle, setBillingCycle] = useState("weekly");
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "payment/verify", {
      withCredentials: true,
    });
    if (res.data.isPremiumMember) setIsPremiumMember(true);
  };

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

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setBillingCycle("weekly"); // reset when switching
  };

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const renderPriceOptions = (plan) => {
    const options = priceOptions[plan]?.[billingCycle] || [];
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {options.map((opt, idx) => (
          <div key={idx} className="relative bg-white text-black p-4 rounded-xl shadow-md">
            {opt.tag === "Best Value" && (
              <div className="absolute top-0 left-0 bg-yellow-400 px-2 py-1 text-xs font-bold rounded-br-xl">
                {opt.tag}
              </div>
            )}
            {opt.tag.includes("Save") && (
              <div className="absolute bottom-2 right-2 text-xs font-bold text-green-600">
                {opt.tag}
              </div>
            )}
            <h4 className="text-lg font-bold mb-1">{opt.label}</h4>
            <p className="text-sm">{opt.price}</p>
          </div>
        ))}
      </div>
    );
  };

  return isPremiumMember ? (
    "YOU ARE ALREADY A PREMIUM MEMBER"
  ) : (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* {showConfetti && <Confetti width={width} height={height} />} */}

      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upgrade to <span className="text-yellow-400">Premium</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Unlock exclusive features, boost your visibility, and connect with the best devs out there.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 max-w-6xl mx-auto px-4 pb-20">
        {plans.map((plan, idx) => {
          const isSelected = plan.name === selectedPlan;
          return (
            <div
              key={idx}
              className={`relative rounded-2xl shadow-xl p-6 border transition-transform transform hover:scale-105 cursor-pointer ${
                isSelected ? "border-green-400" : "border-transparent"
              } ${
                plan.highlight
                  ? "bg-yellow-400 text-black border-yellow-300"
                  : "bg-gray-500 bg-opacity-10 border-gray-600 border-opacity-20"
              }`}
              onClick={() => handlePlanClick(plan.name)}
            >
              <div className="p-1 top-0 left-0 rounded-full w-7 h-7 shadow-black shadow-inner" >
                  <div className={` ${ isSelected ? "bg-green-600" : "bg-transparent" } transition-all duration-300 ease-in-out relative w-full h-full rounded-full`}></div>
              </div>
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name !== "Basic" && isSelected && (
                <div>
                  <div className="flex items-center justify-center mb-4 relative bg-gray-300 rounded-xl overflow-hidden">
                    <div
                      className={`absolute top-0 bottom-0 left-0 w-1/2 bg-black transition-all duration-300 transform ${billingCycle === "monthly" ? "translate-x-full" : "translate-x-0"}`}
                    ></div>
                    {['weekly', 'monthly'].map((type) => (
                      <button
                        key={type}
                        className="w-1/2 z-10 py-2 text-sm font-semibold text-black"
                        onClick={() => handleBillingChange(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>

                  {renderPriceOptions(plan.name)}
                </div>
              )}

              <button
                className={`mt-6 w-full py-2 rounded-xl font-semibold transition duration-200 ${
                  plan.highlight
                    ? "bg-black hover:bg-gray-800 text-white"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanClick(plan.name);
                }}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Premium;




























// import React, { useEffect, useState } from "react";
// import { CheckCircle } from "lucide-react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/Constants/constants";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
// import { useSelector } from "react-redux";

// const plans = [
//   {
//     name: "Basic",
//     price: "Free",
//     features: [
//       "Browse developers",
//       "Daily pop-in limit : 30",
//       "Chat with connections"
//     ],
//     cta: "Get Started",
//     highlight: false,
//   },
//   {
//     name: "Pro",
//     price: "$9.99/mo",
//     features: [
//       "Daily pop-in limit : 100",
//       "See whom you liked",
//       "Pro badge",
//     ],
//     cta: "Go Pro",
//     highlight: true,
//   },
//   {
//     name: "Elite",
//     price: "$19.99/mo",
//     features: [
//       "Priority profile placement",
//       "Unlimilted pop-in",
//       "Elite badge",
//       "See whom you liked",
//       "See whom you ignored",
//     ],
//     cta: "Become Elite",
//     highlight: false,
//   },
// ];


// const Premium = () => {

//   const membershipType = useSelector((store) => store.profile.membershipType);
//   const [isPremiumMember, setIsPremiumMember] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(true);
//   const { width, height } = useWindowSize();

//   useEffect(() => {
//     verifyPremiumUser();
//   } , []);

//   const verifyPremiumUser = async () => {
//     const res = await axios.get(BASE_URL + "payment/verify", {
//       withCredentials: true,
//     });

//     if (res.data.isPremiumMember) {
//       setIsPremiumMember(true);
//     }

//   }

  // const handlePaymentButtonClick = async (type) => {
  //   console.log("Payment button clicked for type:", type);
  //   const order = await axios.post(BASE_URL + "payment/create", 
  //     {
  //       membershipType: type,
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   // now we should open the RazorPay pop-up for payment
  //   const { amount , currency , keyId , notes , orderId } = order.data;
  //   const options = {
  //     key: keyId, 
  //     amount, 
  //     currency, 
  //     name: "TechTribe",
  //     description: 'Membership for ' + order.data.notes.membershipType,
  //     order_id: orderId,
  //     prefill: {
  //       name: notes.firstName + " " + notes.lastName,
  //       email: notes.emailId,
  //       contact: '9999999999'
  //     },
  //     theme: {
  //       color: '#F37254'
  //     },
  //     handler: verifyPremiumUser,
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();

  // };




//   return (
//     isPremiumMember ? "YOU ARE ALREADY A PREMIUM MEMBER" : (
//     <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
//       {showConfetti && <Confetti width={width} height={height} />}
//       {/* Hero Section */}
//       <section className="text-center py-16 px-4">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           Upgrade to <span className="text-yellow-400">Premium</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
//           Unlock exclusive features, boost your visibility, and connect with the best devs out there.
//         </p>
//       </section>

//       {/* Pricing Plans */}
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-20">
//         {plans.map((plan, idx) => (
//           <div
//             key={idx}
//             className={`rounded-2xl shadow-xl p-6 border transition-transform transform hover:scale-105 ${
//               plan.highlight
//                 ? "bg-yellow-400 text-black border-yellow-300"
//                 : "bg-gray-500 bg-opacity-10 border-gray-600 border-opacity-20"
//             }`}
//           >
//             <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
//             <p className="text-3xl font-bold mb-6">{plan.price}</p>
//             <ul className="space-y-3 mb-6">
//               {plan.features.map((feature, i) => (
//                 <li key={i} className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>
//             <button
//               className={`w-full py-2 rounded-xl font-semibold transition duration-200 ${
//                 plan.highlight
//                   ? "bg-black hover:bg-gray-800 text-white"
//                   : "bg-yellow-400 hover:bg-yellow-300 text-black"
//               }`}
//               onClick={() => handlePaymentButtonClick("gold")}
//             >
//               {plan.cta}
//             </button>
//           </div>
//         ))}
//       </section>
//     </div> )
//   );
// };

// export default Premium;
