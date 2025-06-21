import React from 'react';

const AboutUser = (props) => {

  const {
    bio,
    setBio
  } = props;

  const handleBioChange = (e) => {
    setBio(e.target.value)
  }

  return (
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg">
        <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-center flex items-center justify-center">
            <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">info</i>
            About You
        </div>
        <textarea
            placeholder="Tell us about yourself..."
            className="w-full h-40 p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={bio}
            onChange={handleBioChange}
        />
    </div>
  );
};

export default AboutUser;
