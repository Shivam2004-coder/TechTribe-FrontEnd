// components/UserProfileDetail.jsx
import React from "react";
import { useSelector } from "react-redux";

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
  const profile = useSelector((state) => state.profile);

  if (!profile || !profile.firstName || !profile.lastName) return null;

  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    bio,
    jobTitle,
    companyName,
    school,
    livingIn,
    skills,
    socialLinks,
  } = feed.feed;

  console.log(dateOfBirth);
  console.log("firstName: ", firstName);

  return (
    <div className="bg-white p-3 rounded-xl h-full shadow-md w-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">{firstName+" "+lastName+" , "+calculateAge(dateOfBirth)}</h2>

      {/* This is a Bio of the user... */}
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-4">
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
        <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-4">
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


      {/* This is a work of the user */}
      { jobTitle &&
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-4">
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
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-4">
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
      <div className="flex flex-col bg-gray-700 rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-1" >
          <i className="material-icons mr-2" > school </i>
          <span className="font-bold text-gray-300" >Education</span>
        </div>
        <div>
          <p>{school}</p>
        </div>
      </div>
      }

    </div>
  );
};

export default UserProfileDetail;
