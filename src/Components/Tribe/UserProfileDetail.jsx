// components/UserProfileDetail.jsx
import React from "react";
// import { useSelector } from "react-redux";

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
};

 // Calculate age
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob); 
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

const UserProfileDetail = ({feed}) => {
  // const profile = useSelector((state) => state.profile);

  // if (!profile || !profile.firstName || !profile.lastName) return null;

  const {
    firstName,
    lastName,
    dateOfBirth,
    promptContent,
    livingIn,
    bio,
    jobTitle,
    companyName,
    school,
    skills,
    socialLinks,
  } = feed;


  const promptsList = [
    "My weakness is...",
    "My hidden talent is...",
    "I am passionate about...",
    "My greatest achievement is...",
    "I want to learn...",
    "A project I enjoyed working on was...",
    "The best advice I've received is...",
    "My favorite programming language is...",
    "The future of technology looks like...",
  ];


  return ( 
    <div className="bg-white p-3 rounded-xl h-full shadow-md w-full flex flex-col overflow-y-auto scrollbar-hidden">
      <h2 className="p-2 text-2xl font-extrabold mb-4 text-black ">{firstName+" "+lastName+" , "+calculateAge(dateOfBirth)}</h2>

      {/* This is a Bio of the user... */}
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
        <div className="flex items-center mb-1" >
          <i className="material-icons mr-2" > face </i>
          <span className="font-bold text-gray-300" >Bio</span>
        </div>
        <div className="" >
          <p>{bio}</p>
        </div>
      </div>
      
      {/* This is a skill of the user */}
      {skills && skills.length > 0 && (
        <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
          <div className="flex items-center mb-2">
            <i className="material-icons mr-2">psychology</i>
            <span className="font-bold text-gray-300">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1 bg-gray-600 text-white text-sm rounded-full whitespace-nowrap shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* This is a location of the user */}
      { livingIn &&
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
        <div className="flex items-center mb-1" >
          <i className="material-icons mr-2" >location_on</i>
          <span className="font-bold text-gray-300" >Living In</span>
        </div>
        <div>
          <p>{livingIn}</p>
        </div>
      </div>
      } 

      {/* This is a work of the user */}
      { jobTitle &&
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
        <div className="flex items-center mb-1" >
          <i className="material-icons mr-2" > work </i>
          <span className="font-bold text-gray-300" >Job</span>
        </div>
        <div>
          <p>{jobTitle}</p>
        </div>
      </div>
      } 

      {/* This is a company in which the user works */}
      { companyName &&
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
        <div className="flex items-center mb-1" >
          <i className="material-icons mr-2" > domain </i>
          <span className="font-bold text-gray-300" >Company</span>
        </div>
        <div>
          <p>{companyName}</p>
        </div>
      </div>
      }

      {/* This is a school in which the user studied */}
      { school &&
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
        <div className="flex items-center mb-1" >
          <i className="material-icons mr-2" > school </i>
          <span className="font-bold text-gray-300" >Education</span>
        </div>
        <div>
          <p>{school}</p>
        </div>
      </div>
      }

      {/* This is a prompt content of the user */}
      { promptContent && promptContent.length > 0 &&
      <div className="flex flex-col bg-gray-700 rounded-2xl p-2 mb-2 shadow-black shadow-lg">
        {promptContent && promptContent.length > 0 && promptContent.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-gray-600 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
            <div className="flex items-center mb-1">
              ※
              <span className="font-bold text-gray-300">{promptsList[item.index]}</span>
            </div>
            <div>
              <p className="text-white">⁓ {item.content}</p>
            </div>
          </div>
        ))}
      </div>
      }

      {/* This is a socialLinks which the user has */}
      {socialLinks && Object.values(socialLinks).some(link => link) && (
        <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-2 shadow-black shadow-lg">
          <div className="flex items-center mb-1">
            <i className="material-icons mr-2">link</i>
            <span className="font-bold text-gray-300">Social Links</span>
          </div>
          <div className="flex flex-col space-y-1">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                LinkedIn
              </a>
            )}
            {socialLinks.portfolio && (
              <a href={socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Portfolio
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default UserProfileDetail;
