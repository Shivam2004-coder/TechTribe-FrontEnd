import React from 'react'

const LastName = (props) => {

  const {
    lName,
    setLName
  } = props;

  const handleLastNameChange = (e) => {
    setLName(e.target.value);
  }

  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
        <div className="flex justify-between" >
            <h1 className="text-white text-2xl font-bold mb-4 text-left">Last Name</h1>
        </div>
        <input
            placeholder="Enter Your Last Name"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={lName}
            onChange={handleLastNameChange}
        />
    </div>
  )
}

export default LastName;