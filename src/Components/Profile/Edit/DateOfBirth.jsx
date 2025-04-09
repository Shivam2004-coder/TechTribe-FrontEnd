import React from 'react';

const DateOfBirth = (props) => {
  const { dateOfBirth, setdateOfBirth } = props;
  console.log(dateOfBirth);

  const handleDateOfBirthChange = (e) => {
    setdateOfBirth(e.target.value);
  };

  // Calculate age
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

  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-4 text-left">Date Of Birth</h1>
      </div>
      <input
        placeholder="Enter Your First Name"
        className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        value={dateOfBirth}
        onChange={handleDateOfBirthChange}
        type="date" // ✅ added date type for better UX
      />
      {dateOfBirth && (
        <p className="text-white mt-2">Age: {calculateAge(dateOfBirth)}</p>
      )}
    </div>
  );
};

export default DateOfBirth;
