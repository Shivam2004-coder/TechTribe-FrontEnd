import React, { useState } from 'react';
import UploadGrid from './UploadGrid'; // adjust path if needed
import FirstName from './FirstName';
import LastName from './LastName';
import AboutUser from './AboutUser';
import Prompt from './Prompt';
import EditPrompt from './EditPrompt';
import SelectPrompt from './SelectPrompt';
import JobTitle from './JobTitle';
import Company from './Company';
import School from './School';
import LivingIn from './LivingIn';
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import Skills from './Skills';
import SocialLinks from './SocialLinks';
import EmailId from './EmailId';
import useApplyAndSaveChanges from '../../../CustomHooks/useApplyAndSaveChanges';
import ShimmerButton from '../SaveButton/ShimmerButton';
import { useSelector } from 'react-redux';


const Edit = () => {

    const { 
      promptsList,
      fName,
      setFName,
      lName,
      setLName,
      emailId,
      setEId,
      gender,
      setG,
      dateOfBirth,
      setdateOfBirth,
      images,
      setImages,
      bio,
      setB,
      jobTitle,
      setJTitle,
      company,
      setC,
      skills,
      setS,
      schoolName,
      setSchoolName,
      livingIn,
      setLI,
      socialLinks,
      setSL,
      promptContent,
      setPromptContent,
      handleSaveProfileClick,
      isSaving,
      saveSuccess,
    } = useApplyAndSaveChanges();


    // State variables to handle functionality
    const [isSelectPromptClick , setIsSelectPromptClick] = useState(false);
    const [editPrompt , setEditPrompt] = useState(false);
    const [index,setIndex] = useState(null);


    // ✅ Conditionally show form only after profile is ready
    const isProfileLoaded = useSelector((store) => store.profile.isLoaded);

    if (!isProfileLoaded) {
      return (
        <div className="w-full h-full flex items-center justify-center text-white">
          <p>Loading your profile...</p>
        </div>
      );
    }

    return (
        <div className="w-full h-full flex flex-col items-center rounded-lg" >
          <div className=" flex items-center font-bold justify-start mb-10 bg-black p-4 shadow-white shadow-inner" >
            <p>Edit Profile</p>
          </div>
          <div className="bg-gray-800 w-full md:w-5/12 h-screen md:rounded-2xl shadow-xl text-white overflow-y-scroll scrollbar-hidden">
            {
              editPrompt ? (
                <EditPrompt 
                  promptsList={promptsList}   
                  setEditPrompt={setEditPrompt}
                  index={index}
                  setPromptContent={setPromptContent}
                />
              ) : isSelectPromptClick ? (
                <SelectPrompt 
                  promptsList={promptsList} 
                  setIndex={setIndex}
                  setEditPrompt={setEditPrompt}
                  setIsSelectPromptClick={setIsSelectPromptClick}
                />
              ) : (
                <>
                  {/* upload 9 photos from the computer */}
                  <UploadGrid 
                      images={images}
                      setImages={setImages}
                  />

                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  {/* Prompts */}
                  <Prompt 
                    promptsList={promptsList}
                    setIsSelectPromptClick={setIsSelectPromptClick} 
                    promptContent={promptContent}
                    setPromptContent={setPromptContent}
                    setEditPrompt={setEditPrompt}
                  />
        
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  <FirstName
                      fName={fName}
                      setFName={setFName}
                  />
                
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  <LastName
                      lName={lName}
                      setLName={setLName}
                  />

                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  <EmailId 
                      emailId={emailId}
                      setEmailId={setEId}
                  />

                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  <Gender 
                      gender={gender}
                      setG={setG}
                  />
                
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  <DateOfBirth 
                      dateOfBirth={dateOfBirth}
                      setdateOfBirth={setdateOfBirth}
                  />
                
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />
        
                  {/* Other sections (About, Prompts, etc.) */}
                  <AboutUser 
                      bio={bio}
                      setBio={setB}
                  />
        
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  {/* Jon Title */}
                  <JobTitle 
                      jobTitle={jobTitle}
                      setJobTitle={setJTitle}
                  />

                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  {/* Company */}
                  <Company 
                      company={company}
                      setCompany={setC}
                  />

                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />
                  
                  {/* Skills */}
                  <Skills 
                      skills={skills}
                      setSkills={setS}
                  />

                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  {/* School */}

                  <School 
                      schoolName={schoolName}
                      setSchoolName={setSchoolName}
                  />
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />

                  {/* Living In */}
                  <LivingIn 
                      livingIn={livingIn}
                      setLivingIn={setLI}
                  />
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />
                  
                  {/* Social Links */}
                  <SocialLinks 
                      socialLinks={socialLinks}
                      setSocialLinks={setSL}
                  />
                  <hr className="md:bg-gray-800 border border-gray-800 m-2 md:m-4" />
                </>
              )
            }
          </div>

          <div className="w-9/12 md:w-4/12 m-1 flex items-center justify-center">
            <ShimmerButton
              onClick={handleSaveProfileClick}
              isSaving={isSaving}
              isSuccess={saveSuccess}
              label="Save Profile"
              loadingLabel="Saving..."
            />
          </div>

        </div>
      );
};

export default Edit;