// This is a heavily enhanced version of your Premium component with interactive
// selection, animated tab switches, and dynamic pricing options display.
// Assumes Tailwind CSS is available.

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";
import { fetchAndStoreUserProfile } from "../../CustomHooks/fetchAndStoreUserProfile";

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
      { idx: "P1W" , label: "1 Week", price: "₹99.00/week", amount: 9900, tag: "Popular" },
      { idx: "P2W" , label: "3 Weeks", price: "₹67.76/week", amount: 20300, tag: "Saves 25%" }
    ],
    monthly: [
      { idx: "P1M" , label: "1 Month", price: "₹49.75/week", amount: 19900, tag: "Saves 20%" },
      { idx: "P2M" , label: "3 Months", price: "₹40.83/week", amount: 49000, tag: "Saves 35%" },
      { idx: "P3M" , label: "6 Months", price: "₹34.16/week", amount: 82000, tag: "Best Value", tag2: "Saves 50%" }
    ]
  },
  Elite: {
    weekly: [
      { idx: "E1W" , label: "1 Week", price: "₹159.00/week", amount: 15900, tag: "Popular" },
      { idx: "E2W" , label: "3 Weeks", price: "₹93.33/week", amount: 28000, tag: "Saves 23%" }
    ],
    monthly: [
      { idx: "E1M" , label: "1 Month", price: "₹79.75/week", amount: 31900, tag: "Saves 20%" },
      { idx: "E2M" , label: "3 Months", price: "₹64.16/week", amount: 77000, tag: "Saves 35%" },
      { idx: "E3M" , label: "6 Months", price: "₹54.16/week", amount: 130000, tag: "Best Value", tag2: "Saves 55%" }
    ]
  }
};


const Premium = () => {
  const membershipType = useSelector((store) => store.profile.membershipType);
  const membershipExpiresAt = useSelector((store) => store.profile.membershipExpiresAt);
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [selectedBillingPlan , setSelectedBillingPlan] = useState("");
  const [billingCycle, setBillingCycle] = useState("weekly");
  const [isContinueClick , setIsContinueClick] = useState(false);
  // const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { width, height } = useWindowSize();

  // console.log("MemberShipExpiresAt : "+membershipExpiresAt);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(import.meta.env.VITE_BASE_URL + "payment/verify", {
      withCredentials: true,
    });
    if (res.data.isPremiumMember){
      await fetchAndStoreUserProfile(dispatch); 
      setIsPremiumMember(true);
    };
  };

  const handlePaymentButtonClick = async (type,detail) => {
    // console.log("Payment button clicked for type:", type);
    const order = await axios.post(import.meta.env.VITE_BASE_URL + "payment/create", 
      {
        membershipType: type,
        membershipDetail: detail
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
  };

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const handleBillingClick = (billingPlan) => {
    setSelectedBillingPlan(billingPlan);
  }

  const handleIsContinueClick = () => {
    setIsContinueClick(!isContinueClick);
  }

  const selectedPlanDetails = priceOptions[selectedPlan]?.[billingCycle]?.find(
    (option) => option.idx === selectedBillingPlan
  );


  const renderPriceOptions = (plan) => {
    const options = priceOptions[plan]?.[billingCycle] || [];
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mt-4">
        {options.map((opt, idx) => (
          <div key={idx} className={`relative bg-gray-700 text-black border-6 p-10 rounded-xl ${ selectedBillingPlan === opt.idx ? " border-white" : "border-transparent" } shadow-black shadow-md`}
              onClick={() => handleBillingClick(opt.idx)}
          >
            { selectedBillingPlan === opt.idx &&
              <div className="absolute top-0 right-0 text-sm text-white px-2 py-1 font-bold rounded-br-xl rounded-tl-lg">
                <i className="material-icons" >check_circle</i>
              </div>
            }
            { (opt.tag === "Best Value" || opt.tag === "Popular") && (
              <div className="absolute top-0 left-0 text-sm bg-yellow-400 px-2 py-1 font-bold rounded-br-xl rounded-tl-lg">
                {opt.tag}
              </div>
            )}
            { opt.tag === "Best Value" && (
              <div className="absolute top-0 left-0 text-sm bg-yellow-400 px-2 py-1 font-bold rounded-br-xl rounded-tl-lg">
                {opt.tag}
              </div>
            )}
            { ( opt.tag.includes("Save") || opt?.tag2?.includes("Save") ) && (
              <div className="absolute bottom-2 right-2 text-xs font-bold bg-black p-2 rounded-full text-green-600">
                {(opt.tag.includes("Save") && opt.tag) || (opt?.tag2?.includes("Save") && opt.tag2) }
              </div>
            )}
            <h4 className="text-2xl text-white font-bold mb-1">{opt.label}</h4>
            <p className="text-lg text-white ">{opt.price}</p>
          </div>
        ))}
      </div>
    );
  };

  // Format membershipExpiresAt
  const formatExpiryDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);

    return date.toLocaleString("en-US", {
      weekday: "long",     // Tuesday
      year: "numeric",     // 2025
      month: "long",       // July
      day: "numeric",      // 2
      hour: "numeric",     // 4
      minute: "2-digit",   // 15
      hour12: true         // PM
    });
  };

  const getTimeLeft = (dateStr) => {
    if (!dateStr) return "";
    const now = new Date();
    const expiry = new Date(dateStr);
  
    const diff = expiry - now;
    if (diff <= 0) return "Expired";
  
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    return `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}, and ${minutes} minute${minutes !== 1 ? "s" : ""} left`;
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(membershipExpiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(membershipExpiresAt));
    }, 1000); // update every minute

    return () => clearInterval(interval);
  }, [membershipExpiresAt]);





  return isPremiumMember ? (

      <div className="min-h-screen w-full flex flex-col items-center text-white" >
        {/* <Confetti width={width} height={height} /> */}
        <section className="text-center flex flex-col items-center py-16 px-4">
          <div className="text-4xl md:text-5xl bg-black h-25 w-25 rounded-full shadow-white shadow-inner flex items-center justify-center font-bold mb-4">
            { membershipType === "Elite" ? <i class="fa-solid fa-crown"></i> : <i className="material-icons" >workspace_premium</i>  }
          </div>
          <p className="text-lg  md:text-xl text-white max-w-2xl mx-auto">
            You are an {membershipType} member now !!!
          </p>
        </section>

        {plans.map((plan, idx) => {
          const isSelected = plan.name === membershipType;
          return (
            isSelected && (
              <div key={idx}
                  className="relative w-3/4 p-6 border-1  bg-gradient-to-b from-[#1e1e1e] via-[#3e3d3d] to-[#403e3e] rounded-2xl shadow-md transition-all duration-400 ease-in-out  transform cursor-pointer 
                  text-white "
              >
                <h2 className="text-2xl font-semibold mb-4"> 
                  {plan.name}
                </h2>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
              </div>
            )
          );
        })}

        <div className="bg-black border border-gray-600 rounded-xl px-6 py-4 mt-4 shadow-md w-full max-w-md text-center">
          <p className="text-lg text-yellow-400 font-semibold">
            Expires on: {formatExpiryDate(membershipExpiresAt)}
          </p>
          <p className="text-sm text-green-400 mt-2">
            ⏳ {timeLeft}
          </p>
        </div>

      </div>

  ) : isContinueClick ? (

      <Payment 
        handlePaymentButtonClick={handlePaymentButtonClick}
        selectedPlan={selectedPlan} 
        selectedPlanDetails={selectedPlanDetails} 
        handleBackClick={handleIsContinueClick}
      />

  ) : (

    <div className="min-h-screen w-full text-white">

      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upgrade to <span className="text-yellow-400">Premium</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Unlock exclusive features, boost your visibility, and connect with the best devs out there.
        </p>
      </section>

      <section className="grid grid-cols-1  gap-6 max-w-6xl mx-auto px-4 pb-20">
        {plans.map((plan, idx) => {
          const isSelected = plan.name === selectedPlan;
          return (
            <div
              key={idx}
              className={`relative p-6 border-1  bg-gradient-to-b from-[#1e1e1e] via-[#3e3d3d] to-[#403e3e] rounded-2xl shadow-md transition-all duration-400 ease-in-out  transform cursor-pointer 
                text-white 
                ${ isSelected ? ( plan.name === "Basic" ? " border-white" : ( plan.name === "Pro" ? "border-amber-500" : "border-cyan-600") ) : "border-gray-500"}
                ${ isSelected ? "border-8" : "border-2" }
                `}
              onClick={() => handlePlanClick(plan.name)}
            >
                <h2 className="text-2xl font-semibold mb-4"> 
                  {plan.name}
                </h2>
              <div className="p-1 absolute top-4 right-4 rounded-full w-13 h-13 shadow-inner shadow-white flex items-center justify-center bg-gray-800 " >
                { plan.name === "Elite" && <i className="fa-solid fa-crown"></i> }
                { plan.name !== "Elite" && 
                  <i className="material-icons" >
                    { plan.name === "Pro" ? "workspace_premium" : "eco" } 
                  </i>  
                }
              </div>
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
                  <div className="flex items-center justify-center mb-4 relative rounded-xl overflow-hidden">
                    <div className="relative bg-gray-400 rounded-md p-4 flex items-center justify-between w-full shadow-inner shadow-black">
                      {/* Sliding background */}
                        <div
                           className={`absolute top-1 bottom-1 m-1 rounded-md transition-all duration-300 ease-in-out bg-gray-950 shadow-inner shadow-white ${
                              billingCycle === "monthly"
                                ? "left-[52%] right-[4px]" // shifts to the right with margin
                                : "left-[4px] right-[52%]" // stays on the left with margin
                            }`}
                        />
                          {/* Weekly Button */}
                          <button
                            className={`z-10 w-1/2 h-10 flex items-center justify-center text-md cursor-pointer font-medium ${ billingCycle === "weekly" ? "text-white" : "text-black" } transition-all duration-200 ease-in-out bg-transparent rounded-full focus:outline-none`}
                            onClick={() => handleBillingChange("weekly")}
                          >
                            Weekly
                          </button>

                          {/* Monthly Button */}
                          <button
                            className={`z-10 w-1/2 h-10 flex items-center justify-center text-md cursor-pointer font-medium ${ billingCycle !== "weekly" ? "text-white" : "text-black" } transition-all duration-200 ease-in-out bg-transparent rounded-full focus:outline-none`}
                            onClick={() => handleBillingChange("monthly")}
                          >
                            Monthly
                          </button>
                        </div>
                    </div>
                  {renderPriceOptions(plan.name)}
                </div>
              )}



              {plan.name !== "Basic" && isSelected && selectedPlanDetails ? 
                <button
                  className="mt-6 w-full p-2 rounded-xl flex items-center justify-around cursor-pointer font-semibold  text-white transition duration-200"
                >
                  <div className="flex flex-col justify-center w-1/2 items-center" >
                    <p>{selectedPlanDetails.label}</p>
                    <p>{selectedPlanDetails.price}</p>
                  </div>
                  <div className="bg-green-600 p-5 hover:bg-green-400 transition-all duration-300 ease-in-out shadow-black shadow-md rounded-full h-full w-1/2" 
                    onClick={handleIsContinueClick}
                  >
                    Continue
                  </div>
                </button>
              : 
              ( plan.name === "Basic" && isSelected &&
                <button
                  className={`mt-6 w-full py-2 rounded-xl cursor-pointer font-semibold transition duration-200 ${
                    plan.highlight
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "bg-yellow-400 hover:bg-yellow-300 text-black"
                  }`}
                  onClick={() => {
                    navigate("/tribe");
                  }}
                >
                  Get Started
                </button>
              ) }
            </div>
          );
        })}
      </section>
    </div>

  );
};

export default Premium;