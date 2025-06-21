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
    <div className="w-11/12 p-1 md:p-2 mx-auto bg-gray-700 rounded-sm shadow-lg">
        <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
            <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">badge</i>
            Last Name
        </div>
        <input
            placeholder="Enter Your Last Name"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={lName}
            onChange={handleLastNameChange}
        />
    </div>
  )
}

export default LastName;