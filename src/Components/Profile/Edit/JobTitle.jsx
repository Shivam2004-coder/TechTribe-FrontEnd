import React from 'react'

const JobTitle = (props) => {

  const {
    jobTitle,
    setJobTitle
  } = props;

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  }

  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
        <div className="flex justify-between" >
            <h1 className="text-white text-2xl font-bold mb-4 text-left">Job Title</h1>
            <h4 className="text-white text-sm bg-red-400 font-bold mb-4 text-left flex justify-center items-center rounded-xl p-1 border border-dashed" >IMPORTANT</h4>
        </div>
        <input
            placeholder="Enter Your Job Title"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={jobTitle}
            onChange={handleJobTitleChange}
        />
    </div>
  )
}

export default JobTitle