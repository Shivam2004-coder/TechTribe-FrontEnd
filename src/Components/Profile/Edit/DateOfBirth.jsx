import React, { useRef } from 'react';

const DateOfBirth = (props) => {
  const { dateOfBirth, setdateOfBirth } = props;
  const dateInputRef = useRef(null);

  const handleDateOfBirthChange = (e) => {
    setdateOfBirth(e.target.value);
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDateToInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const openCalendar = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.(); // For modern browsers
      dateInputRef.current.focus();        // Fallback
    }
  };

  return (
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg relative">
      <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
          <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">cake</i>
          Date Of Birth
      </div>

      <div className="relative">
        <input
          ref={dateInputRef}
          type="date"
          value={formatDateToInput(dateOfBirth)}
          onChange={handleDateOfBirthChange}
          className="w-full p-2 text-sm md:text-lg pr-12 text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
        />

        {/* Custom Calendar Icon */}
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-700 hover:text-black"
          onClick={openCalendar}
        >
          <i className="material-icons">calendar_month</i>
        </div>
      </div>

      <p className="text-sm text-gray-300 mt-1">Format: MM-DD-YYYY (or use calendar)</p>

      {dateOfBirth && (
        <div className="text-white flex items-center justify-end">
          Age: {calculateAge(dateOfBirth)}
        </div>
      )}
    </div>
  );
};

export default DateOfBirth;
