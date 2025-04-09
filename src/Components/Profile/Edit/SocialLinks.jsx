import React from 'react';

const SocialLinks = ({ socialLinks, setSocialLinks }) => {
  const handleChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-6 text-left">Social Links</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white block mb-2">LinkedIn</label>
          <input
            name="linkedin"
            placeholder="Enter your LinkedIn URL"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={socialLinks.linkedin}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-white block mb-2">GitHub</label>
          <input
            name="github"
            placeholder="Enter your GitHub URL"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={socialLinks.github}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-white block mb-2">Portfolio</label>
          <input
            name="portfolio"
            placeholder="Enter your Portfolio URL"
            className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={socialLinks.portfolio}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
