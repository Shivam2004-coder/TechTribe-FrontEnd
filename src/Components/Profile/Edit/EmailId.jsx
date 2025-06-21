import React from 'react'

const EmailId = (props) => {

  const {
    emailId,
    setEmailId
  } = props;

  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  }

  return (
    <div className="w-11/12 p-1 md:p-2 mx-auto bg-gray-700 rounded-sm shadow-lg">
        <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
            <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">mail</i>
            Email Id
        </div>
        <input
            placeholder="Enter Your Email Id"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={emailId}
            onChange={handleEmailIdChange}
        />
    </div>
  )
}

export default EmailId;