import React from "react";
import { ArrowLeftCircle, CheckCircle } from "lucide-react";

const planFeatures = {
  Pro: [
    "Daily pop-in limit: 100",
    "See whom you liked",
    "Pro badge",
  ],
  Elite: [
    "Priority profile placement",
    "Unlimited pop-in",
    "Elite badge",
    "See whom you liked",
    "See whom you ignored",
  ],
};

const Payment = ({ selectedPlan, selectedPlanDetails, handlePaymentButtonClick , handleBackClick}) => {
  if (!selectedPlan || !selectedPlanDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-xl font-semibold">No plan selected.</p>
      </div>
    );
  }

  const getWeeksFromLabel = (label) => {
    const [numStr, unit] = label.split(" ");
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return 1;

    if (unit.toLowerCase().includes("month")) {
        return num * 4; // Assuming 1 month = 4 weeks
    }
    return num; // weeks
    };


  const weeks = getWeeksFromLabel(selectedPlanDetails.label);
  const finalAmount = (selectedPlanDetails.amount / 100).toFixed(2); // amount is in paise
  const perWeekAmount = (finalAmount / weeks).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#1f1f1f] to-[#2a2a2a] text-white px-4 py-12 flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-start py-3" >
            {/* Back Button */}
            <button
                onClick={handleBackClick}
                className="top-0 left-0 flex items-center gap-1 text-gray-300 hover:text-white transition"
            >
                <ArrowLeftCircle className="w-10 h-10" />
                <span className="text-md">Back</span>
            </button>
        </div>
      <div className="bg-[#121212] w-full max-w-2xl rounded-2xl shadow-xl p-8 border border-gray-700">


        <h2 className="text-3xl font-bold text-center mb-6">
          Confirm Your <span className="text-yellow-400">{selectedPlan}</span> Plan
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Plan Features:</h3>
          <ul className="space-y-3">
            {planFeatures[selectedPlan]?.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1f1f1f] rounded-xl p-4 shadow-inner mb-6">
          <h3 className="text-lg font-medium mb-2">Selected Duration:</h3>
          <div className="flex items-center justify-between">
            <p className="text-white">{selectedPlanDetails.label}</p>
            <p className="text-yellow-400 font-semibold">{selectedPlanDetails.price}</p>
          </div>
          {(selectedPlanDetails.tag || selectedPlanDetails.tag2) && (
            <div className="mt-2 text-sm text-green-500">
              {selectedPlanDetails.tag?.includes("Save") && selectedPlanDetails.tag}
              {selectedPlanDetails.tag2?.includes("Save") && ` • ${selectedPlanDetails.tag2}`}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-lg font-semibold mb-6">
          <p>Total Weeks:</p>
          <p>{weeks}</p>
        </div>

        <div className="flex items-center justify-between text-xl font-bold mb-8 border-t pt-4 border-gray-600">
          <p>Total Price:</p>
          <p className="text-green-400">₹{finalAmount}</p>
        </div>

        <button
          onClick={() => handlePaymentButtonClick(selectedPlan, selectedPlanDetails)}
          className="w-full bg-green-600 hover:bg-green-500 transition duration-300 ease-in-out text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg active:scale-95"
        >
          Pay Now ₹{finalAmount}
        </button>
      </div>
    </div>
  );
};

export default Payment;
