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
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-4 text-center">About You</h1>
        <textarea
            placeholder="Tell us about yourself..."
            className="w-full h-40 p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            value={bio}
            onChange={handleBioChange}
        />
    </div>
  );
};

export default AboutUser;
