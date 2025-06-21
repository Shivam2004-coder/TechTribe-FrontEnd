import React from 'react';
import { CheckCircle } from 'lucide-react';

const ShimmerButton = ({ 
  onClick, 
  label = "Save", 
  loadingLabel = "Saving...", 
  isSaving = false, 
  isSuccess = false, 
  className = "" 
}) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2 rounded-xl w-full p-6
        font-semibold transition-all duration-300 shadow shadow-black
        ${isSaving ? "bg-green-300 animate-pulse cursor-not-allowed" :
          isSuccess ? "bg-green-700 text-white" :
          "bg-green-700 hover:bg-green-500 active:bg-green-700 text-white cursor-pointer"}
        ${className}
      `}
      onClick={onClick}
      disabled={isSaving}
    >
      {isSuccess ? (
        <>
          <CheckCircle className="w-5 h-5 text-white" />
          Saved
        </>
      ) : isSaving ? loadingLabel : label}
    </button>
  );
};

export default ShimmerButton;
