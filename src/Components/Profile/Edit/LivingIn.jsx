import React from 'react'

const LivingIn = (props) => {

  const {
    livingIn , 
    setLivingIn
  } = props;

  const handleSetLivingIn = (e) => {
    setLivingIn(e.target.value)
  }

  return (
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg">
         <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
          <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">location_on</i>
          Living In
        </div>
        <input
            placeholder="Enter Your Location"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={livingIn}
            onChange={handleSetLivingIn}
        />
    </div>
  )
}

export default LivingIn;