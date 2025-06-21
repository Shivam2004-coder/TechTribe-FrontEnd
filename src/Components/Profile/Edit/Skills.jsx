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
    <div className="w-11/12 p-1 md:p-3 mx-auto bg-gray-700 rounded-sm shadow-lg">
      <div className="text-white text-md md:px-1 md:text-2xl font-bold md:mb-2 text-left flex items-center justify-start">
          <i className="material-icons flex items-center justify-center w-10 scale-90 md:scale-125">interests</i>
          Skills
            <h4 className="text-white text-sm bg-red-400 font-bold scale-80 text-left flex justify-center items-center  rounded-lg p-1 border border-dashed" >IMPORTANT</h4>
      </div>
      <div className="flex mb-4">
        <input
          placeholder="Enter a skill"
          className="w-full p-2 text-sm md:text-lg text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    className="flex items-center my-1 md:my-0 text-sm md:text-lg justify-between bg-gray-600 text-white p-2 rounded-sm md:rounded-md"
                >
                    <span>{skill}</span>
                    <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-black hover:text-white hover:bg-black bg-white cursor-pointer flex items-center justify-center w-6 h-6 rounded-full ml-3"
                    >
                        {/* &times; */}
                        <i className="material-icons ">close</i>
                    </button>
                </div>
            ))}
        </div>

    </div>
  );
};

export default Skills;
