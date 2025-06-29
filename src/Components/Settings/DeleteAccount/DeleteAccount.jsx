import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetProfile } from "../../../utils/ReduxStore/profileSlice";
import { errorMessage, successMessage } from "../../../utils/ShowMessage";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletionReasons = [
    "I found what I was looking for",
    "I’m not satisfied with the platform",
    "Privacy concerns",
    "Too many notifications",
    "I have a duplicate account",
    "Technical issues",
    "Not enough features",
    "I don’t use it anymore",
    "The app is confusing",
    "Prefer a different service",
    "Other",
  ];

  const [selectedReason, setSelectedReason] = useState("");
  const [otherReasonText, setOtherReasonText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const confirmationPhrase = "I am deleting this account on my own will.";

  const handleDelete = async () => {
    setDeleting(true);

    try {
         
        const finalReason = selectedReason === "" ? otherReasonText : selectedReason;

        await axios.delete(`${import.meta.env.VITE_BASE_URL}user/delete/account`, {
            data: { reason: finalReason },
            withCredentials: true
        });


        // Clear Redux & logout
        localStorage.removeItem("user-info");
        dispatch(resetProfile());
        
        successMessage("Your account has been deleted.");
        navigate("/login");
    } 
    catch (err) {
        console.log("Delete Account : "+err);
        errorMessage(err.response?.data?.message || "Failed to delete account.");
    } 
    finally {
        setDeleting(false);
    }
  };

  const handleNext = () => {
    if (!selectedReason) return errorMessage("Please select a reason.");
    if (selectedReason === "Other" && !otherReasonText.trim())
      return errorMessage("Please fill the other reason field.");
    setShowModal(true);
  };

  const displayMode = useSelector((store) => store.profile.displayMode);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-10 ${displayMode === "Light" ? "text-black" : "text-white"}`}>
      <h1 className="text-3xl font-bold mb-6">Delete Account</h1>

      {/* Step 1: Select reason */}
      <div className="w-full max-w-lg space-y-4">
        <label className="font-semibold">
          Why are you deleting your account?
        </label>
        <div className="space-y-2">
          {deletionReasons.map((reason, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`reason-${index}`}
                name="deleteReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="mr-2"
              />
              <label htmlFor={`reason-${index}`}>{reason}</label>
            </div>
          ))}
        </div>

        {selectedReason === "Other" && (
          <textarea
            placeholder="Please specify your reason..."
            value={otherReasonText}
            onChange={(e) => setOtherReasonText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-2"
            rows={4}
          />
        )}

        <button
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
          onClick={handleNext}
        >
          Continue
        </button>
      </div>

      {/* Step 2: Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-lg text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-700 mb-4">
              Once you delete your account,{" "}
              <strong>
                all your information including your images, profile details,
                connections, and messages will be permanently removed
              </strong>
              . This action cannot be undone.
            </p>
            <p className="text-gray-700 mb-4">
              To confirm, please type the following sentence:
            </p>
            <p className="bg-gray-100 px-4 py-2 italic rounded text-sm mb-4 border border-gray-300">
              {confirmationPhrase}
            </p>

            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type here to confirm"
              className="w-full px-4 py-2 border rounded mb-4"
            />

            {confirmationText !== confirmationPhrase && (
              <p className="text-sm text-red-600 mb-2">
                Your confirmation phrase does not match.
              </p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 hover:underline"
                onClick={() => {
                  setShowModal(false);
                  setConfirmationText("");
                }}
              >
                Cancel
              </button>

              <button
                disabled={confirmationText !== confirmationPhrase || deleting}
                onClick={handleDelete}
                className={`px-6 py-2 rounded text-white font-semibold ${
                  confirmationText === confirmationPhrase && !deleting
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {deleting ? "Deleting..." : "Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
