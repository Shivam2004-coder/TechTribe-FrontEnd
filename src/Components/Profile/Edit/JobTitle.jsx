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
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg">
        <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
          <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">work</i>
          Job Title
          <h4 className="text-white text-sm bg-red-400 font-bold scale-80 text-left flex justify-center items-center  rounded-lg p-1 border border-dashed" >IMPORTANT</h4>
        </div>
        <input
            placeholder="Enter Your Job Title"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={jobTitle}
            onChange={handleJobTitleChange}
        />
    </div>
  )
}

export default JobTitle