import React from 'react'
import UploadImage from './UploadImage';

const Form = ({formData, setFormData , images, setImages}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

    const handleAddSkill = () => {
        const trimmed = formData.inputSkill?.trim();
        if (trimmed && !formData.skills.includes(trimmed)) {
            setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, trimmed],
            inputSkill: '',
            }));
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };
    

  return (
    <form className="flex flex-col p-1">
        <div className="grid grid-cols-2 justify-between pb-2 h-80" >
            <div className=" flex flex-col col-span-1 pl-0 pt-0 pr-10 items-start justify-between" >
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-black text-xl w-full" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-black text-xl w-full" />

                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-gray-500 text-xl w-full" />
                <select name="gender" value={formData.gender} onChange={handleChange} className="bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-gray-500 text-xl w-full">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-black text-xl w-full" />
            </div>
            <UploadImage images={images}
                        setImages={setImages}
            />
        </div>
        <div className="flex flex-col justify-between p-1 pl-0 h-56" >

            <textarea placeholder="Bio" name="bio" value={formData.bio} onChange={handleChange} className="bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-black text-xl md:col-span-2" rows={4}></textarea>

            <div className="flex flex-col justify-between mt-2">
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        name="inputSkill" 
                        placeholder="Enter a skill"
                        value={formData.inputSkill || ''}
                        onChange={handleChange}
                        className="flex-1 bg-gray-300 rounded-md p-3 border-2 border-gray-800 hover:bg-gray-100 text-black text-xl"
                    />
                    <button
                        type="button"
                        onClick={handleAddSkill}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                    ADD
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                        <span>{skill}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-red-500 hover:text-red-700"
                        >
                        ✖
                        </button>
                    </div>
                    ))}
                </div>
            </div>
        </div>

      </form>

  )
}

export default Form