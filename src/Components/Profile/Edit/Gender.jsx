import React, { useState } from 'react';

const GenderDropdown = ({ gender, setG }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: 'Male', value: 'Male', icon: 'male' },
    { label: 'Female', value: 'Female', icon: 'female' },
    { label: 'Other', value: 'Other', icon: 'transgender' },
  ];

  const handleSelect = (option) => {
    setG(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === gender);

  return (
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg transition-all duration-600 ease-in-out relative">

      <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
          <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">wc</i>
          Gender
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-gray-300 text-black p-2 text-sm md:text-lg shadow-md flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <i className="material-icons">{selectedOption?.icon || 'person'}</i>
          <span>{selectedOption?.label || 'Select your gender'}</span>
        </div>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-[96%] bg-white rounded-sm shadow-lg mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="cursor-pointer p-2 text-sm md:text-lg flex text-black items-center gap-2 hover:bg-gray-600"
            >
              <i className="material-icons">{option.icon}</i>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderDropdown;
