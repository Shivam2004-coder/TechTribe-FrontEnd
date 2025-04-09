import React from 'react'

const FirstName = (props) => {

  const {
    fName,
    setFName
  } = props;

  const handleFirstNameChange = (e) => {
    setFName(e.target.value);
  }

  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
        <div className="flex justify-between" >
            <h1 className="text-white text-2xl font-bold mb-4 text-left">First Name</h1>
        </div>
        <input
            placeholder="Enter Your First Name"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={fName}
            onChange={handleFirstNameChange}
        />
    </div>
  )
}

export default FirstName;