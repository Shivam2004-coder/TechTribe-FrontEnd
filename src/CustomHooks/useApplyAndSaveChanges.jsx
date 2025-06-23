import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBio, setCompanyName, setDateOfBirth, setEmailId, setFirstName, setGender, setGithubLink, setJobTitle, setLastName, setLinkedinLink, setLivingIn, setPortfolioLink, setPromptUserContent, setSchool, setSkills, setUploadedImages } from '../utils/ReduxStore/profileSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants/constants';
import { errorMessage } from '../utils/ShowMessage';

const useApplyAndSaveChanges = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

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

    const profileImage = useSelector((store) => store.profile.profileImage);

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
    const userSocialLinks = useSelector((store) => store.profile.socialLinks);
    const userSkills = useSelector((store) => store.profile.skills);

    // console.log("User Social Links: ", userSocialLinks);

    // State variables to handle functionality

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
    

    console.log("Social Links: ", socialLinks);



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

     const handleSaveProfileClick = async () => {
        try {

            setIsSaving(true); // start shimmer
            setSaveSuccess(false);
            handleApplyChangesClick(); // Apply changes to the Redux store

            console.log("I am in delete Function !!");

            const response = await axios.post(BASE_URL + "profile/delete/savedImages", {
                uploadedImages: images.filter(Boolean),
                profileImage,
            },{withCredentials: true});

            console.log(response);

            const res = await axios.patch(BASE_URL + "profile/edit", {
                firstName: fName,
                lastName: lName,
                emailId,
                gender,
                dateOfBirth,
                promptContent,
                uploadedImages: images.filter(Boolean),
                profileImage,
                bio,
                jobTitle,
                companyName: company,
                school: schoolName,
                livingIn,
                socialLinks,
                skills,
            }, { withCredentials: true });

        
            console.log(res);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
      
        } 
        catch (error) {
            errorMessage(error.message);
        }    
        finally {
            setIsSaving(false); // stop shimmer
        }
    }

    return {
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
        handleApplyChangesClick,
        handleSaveProfileClick,
        isSaving,
        saveSuccess
    }
}

export default useApplyAndSaveChanges