import React from 'react';

const SocialLinks = ({ socialLinks, setSocialLinks }) => {
  const handleChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg">
      <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
        <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">link</i>
        Social Links
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white block mb-2">LinkedIn</label>
          <input
            name="linkedin"
            placeholder="Enter your LinkedIn URL"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={socialLinks.linkedin}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-white block mb-2">GitHub</label>
          <input
            name="github"
            placeholder="Enter your GitHub URL"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={socialLinks.github}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-white block mb-2">Portfolio</label>
          <input
            name="portfolio"
            placeholder="Enter your Portfolio URL"
            className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={socialLinks.portfolio}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
