import React from 'react'

const Company = (props) => {

  const {
    company,
    setCompany
  } = props;

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  }

  return (
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg">
        <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
            <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">domain</i>
            Company
             <h4 className="text-white text-sm bg-red-400 font-bold scale-80 text-left flex justify-center items-center  rounded-lg p-1 border border-dashed" >IMPORTANT</h4>
        </div>
        <input
            placeholder="Enter Your Company Name"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={company}
            onChange={handleCompanyChange}
        />
    </div>
  )
}

export default Company