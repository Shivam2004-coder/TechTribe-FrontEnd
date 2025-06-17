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

const UserProfileDetail = ({feed}) => {
  const profile = useSelector((state) => state.profile);

  if (!profile || !profile.firstName || !profile.lastName) return null;

  const {
    firstName,
    lastName,
    gender,
    bio,
    jobTitle,
    companyName,
    school,
    livingIn,
    skills,
    socialLinks,
  } = feed.feed;
  console.log("UserProfileDetail feed", firstName);
  console.log("UserProfileDetail feed", lastName);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mt-4 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">User Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
        <InfoRow label="Full Name" value={`${firstName} ${lastName}`} />
        {/* <InfoRow label="Email ID" value={emailId} /> */}
        <InfoRow label="Gender" value={gender} />
        {/* <InfoRow label="Date of Birth" value={dateOfBirth} /> */}
        <InfoRow label="Bio" value={bio} />
        <InfoRow label="Job Title" value={jobTitle} />
        <InfoRow label="Company" value={companyName} />
        <InfoRow label="School" value={school} />
        <InfoRow label="Lives In" value={livingIn} />
        <InfoRow
          label="Skills"
          value={skills.length > 0 ? skills.join(", ") : null}
        />
        <InfoRow label="GitHub" value={socialLinks?.github} />
        <InfoRow label="LinkedIn" value={socialLinks?.linkedin} />
        <InfoRow label="Portfolio" value={socialLinks?.portfolio} />
      </div>
    </div>
  );
};

export default UserProfileDetail;
