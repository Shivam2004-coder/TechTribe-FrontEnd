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
    <div className="w-11/12 p-1 md:p-2 mx-auto bg-gray-700 rounded-sm shadow-lg">
        <div className="text-white text-md md:text-2xl md:px-1 font-bold md:mb-2 text-left flex items-center justify-start">
            <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">badge</i>
            First Name
        </div>
        <input
            placeholder="Enter Your First Name"
            className="w-full p-2 text-sm md:text-lg  text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={fName}
            onChange={handleFirstNameChange}
        />
    </div>
  )
}

export default FirstName;