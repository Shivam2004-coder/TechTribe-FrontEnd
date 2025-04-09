import React from 'react';

const Gender = (props) => {
    const {
      gender,
      setG
    } = props;
  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-4 text-left">Gender</h1>
      </div>
      <select
        value={gender}
        onChange={(e) => setG(e.target.value)}
        className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="" disabled>Select your gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default Gender;