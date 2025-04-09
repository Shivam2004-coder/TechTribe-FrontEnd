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
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
        <div className="flex justify-between" >
            <h1 className="text-white text-2xl font-bold mb-4 text-left">Email Id</h1>
        </div>
        <input
            placeholder="Enter Your Email Id"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={emailId}
            onChange={handleEmailIdChange}
        />
    </div>
  )
}

export default EmailId;