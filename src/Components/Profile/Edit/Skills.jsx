import React, { useState } from 'react';

const Skills = (props) => {
  const [skillInput, setSkillInput] = useState('');
  const {
    skills,
    setSkills
  } = props;

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput(''); // Clear input after adding
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="w-11/12 p-4 mx-auto bg-gray-700 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-4 text-left">Skills</h1>
      </div>
      <div className="flex mb-4">
        <input
          placeholder="Enter a skill"
          className="w-full p-3 text-black border-none bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={skillInput}
          onChange={handleSkillInputChange}
        />
        <button
          onClick={handleAddSkill}
          className="ml-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
                <div
                    key={skill}
                    className="inline-flex items-center bg-gray-600 text-white px-3 py-1 rounded-full"
                >
                    <span>{skill}</span>
                    <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-red-400 hover:text-red-600 font-bold"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>

    </div>
  );
};

export default Skills;
