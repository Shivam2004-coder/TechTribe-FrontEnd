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
import { useDispatch, useSelector } from 'react-redux';
import { setBio, setCompanyName, setDateOfBirth, setEmailId, setFirstName, setGender, setGithubLink, setJobTitle, setLastName, setLinkedinLink, setLivingIn, setPortfolioLink, setPromptUserContent, setSchool, setSkills, setUploadedImages } from '../../../utils/ReduxStore/profileSlice';
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import Skills from './Skills';
import SocialLinks from './SocialLinks';
import EmailId from './EmailId';


const Edit = () => {

    const dispatch = useDispatch();

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

    // The user data stored in the dataBase ....
    const userFirstName = useSelector((store) => store.profile.firstName);
    const userLastName = useSelector((store) => store.profile.lastName);
    const userEmailId = useSelector((store) => store.profile.emailId);
    const userGender = useSelector((store) => store.profile.gender);
    const userDateOfBirth = useSelector((store) => store.profile.dateOfBirth);
    const userPromptContent = useSelector((store) => store.profile.promptContent);
    const userUploadedImages = useSelector((store) => store.profile.uploadedImages);
    const userBio = useSelector((store) => store.profile.bio);
    const userJobTitleName = useSelector((store) => store.profile.jobTitle);
    const userCompanyName = useSelector((store) => store.profile.companyName);
    const userSchool = useSelector((store) => store.profile.school);
    const userLivingIn = useSelector((store) => store.profile.livingIn);
    const userSocialLinks = useSelector((store) => store.socialLinks);
    const userSkills = useSelector((store) => store.profile.skills);

    // State variables to handle functionality
    const [isSelectPromptClick , setIsSelectPromptClick] = useState(false);
    const [editPrompt , setEditPrompt] = useState(false);
    const [index,setIndex] = useState(null);
    const [promptContent , setPromptContent] = useState(userPromptContent || []);

    // State variables to handle user input
    const [fName,setFName] = useState(userFirstName || "");
    const [lName,setLName] = useState(userLastName || "");
    const [emailId , setEId] = useState(userEmailId || "");
    const [gender,setG] = useState(userGender || "");
    const [dateOfBirth,setdateOfBirth] = useState(userDateOfBirth || "");
    const [images, setImages] = useState(userUploadedImages); // Initialize with nulls
    // const [images, setImages] = useState(Array(9).fill(null)); // Initialize with nulls
    const [bio , setB] = useState(userBio || "");
    const [jobTitle,setJTitle] = useState(userJobTitleName || "");
    const [company,setC] = useState(userCompanyName || "");
    const [skills, setS] = useState(userSkills || []);
    const [schoolName,setSchoolName] = useState(userSchool || "");
    const [livingIn , setLI] = useState(userLivingIn || "");
    const [socialLinks, setSL] = useState({
      linkedin: userSocialLinks?.linkedin || '',
      github: userSocialLinks?.github || '',
      portfolio: userSocialLinks?.portfolio || ''
    });
    



    const handleApplyChangesClick = () => {
        dispatch(setUploadedImages(images.filter(Boolean))); // Only keep non-null images
        dispatch(setPromptUserContent(promptContent));
        dispatch(setFirstName(fName));
        dispatch(setLastName(lName));
        dispatch(setEmailId(emailId));
        dispatch(setGender(gender));
        dispatch(setDateOfBirth(dateOfBirth));
        dispatch(setBio(bio));
        dispatch(setJobTitle(jobTitle));
        dispatch(setCompanyName(company));
        dispatch(setSchool(schoolName));
        dispatch(setLivingIn(livingIn));
        dispatch(setSkills(skills));
        dispatch(setGithubLink(socialLinks.github));
        dispatch(setLinkedinLink(socialLinks.linkedin));
        dispatch(setPortfolioLink(socialLinks.portfolio));
    }

    return (
        <div className="w-full h-full flex flex-col justify-around items-center" >
          <div className="bg-gray-800 w-5/12 h-72 rounded-2xl shadow-xl text-white overflow-y-scroll scrollbar-hidden">
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

                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  {/* Prompts */}
                  <Prompt 
                    promptsList={promptsList}
                    setIsSelectPromptClick={setIsSelectPromptClick} 
                    promptContent={promptContent}
                    setPromptContent={setPromptContent}
                    setEditPrompt={setEditPrompt}
                  />
        
                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  <FirstName
                      fName={fName}
                      setFName={setFName}
                  />
                
                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  <LastName
                      lName={lName}
                      setLName={setLName}
                  />

                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  <EmailId 
                      emailId={emailId}
                      setEmailId={setEId}
                  />

                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  <Gender 
                      gender={gender}
                      setG={setG}
                  />
                
                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  <DateOfBirth 
                      dateOfBirth={dateOfBirth}
                      setdateOfBirth={setdateOfBirth}
                  />
                
                  <hr className="bg-gray-700 border border-gray-400 m-4" />
        
                  {/* Other sections (About, Prompts, etc.) */}
                  <AboutUser 
                      bio={bio}
                      setBio={setB}
                  />
        
                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  {/* Jon Title */}
                  <JobTitle 
                      jobTitle={jobTitle}
                      setJobTitle={setJTitle}
                  />

                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  {/* Company */}
                  <Company 
                      company={company}
                      setCompany={setC}
                  />

                  <hr className="bg-gray-700 border border-gray-400 m-4" />
                  
                  {/* Skills */}
                  <Skills 
                      skills={skills}
                      setSkills={setS}
                  />

                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  {/* School */}

                  <School 
                      schoolName={schoolName}
                      setSchoolName={setSchoolName}
                  />
                  <hr className="bg-gray-700 border border-gray-400 m-4" />

                  {/* Living In */}
                  <LivingIn 
                      livingIn={livingIn}
                      setLivingIn={setLI}
                  />
                  <hr className="bg-gray-700 border border-gray-400 m-4" />
                  
                  {/* Social Links */}
                  <SocialLinks 
                      socialLinks={socialLinks}
                      setSocialLinks={setSL}
                  />
                  <hr className="bg-gray-700 border border-gray-400 m-4" />
                </>
              )
            }
          </div>

          <div>
            <button className="bg-green-600 rounded-xl shadow shadow-black p-4 hover:bg-green-500 cursor-pointer active:bg-green-600" 
                    onClick={handleApplyChangesClick}
            >
              Apply Changes
            </button>
          </div>

        </div>
      );
};

export default Edit;