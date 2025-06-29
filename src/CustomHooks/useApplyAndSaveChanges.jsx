import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBio, setCompanyName, setDateOfBirth, setEmailId, setFirstName, setGender, setGithubLink, setJobTitle, setLastName, setLinkedinLink, setLivingIn, setPortfolioLink, setPromptUserContent, setSchool, setSkills, setUploadedImages } from '../utils/ReduxStore/profileSlice';
import axios from 'axios';
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

    // const [promptContent , setPromptContent] = useState(userPromptContent || []);

    // State variables to handle user input
    // const [fName,setFName] = useState(userFirstName || "");
    // const [lName,setLName] = useState(userLastName || "");
    // const [emailId , setEId] = useState(userEmailId || "");
    // const [gender,setG] = useState(userGender || "");
    // const [dateOfBirth,setdateOfBirth] = useState(userDateOfBirth || "");
    // const [images, setImages] = useState(userUploadedImages); // Initialize with nulls
    // // const [images, setImages] = useState(Array(9).fill(null)); // Initialize with nulls
    // const [bio , setB] = useState(userBio || "");
    // const [jobTitle,setJTitle] = useState(userJobTitleName || "");
    // const [company,setC] = useState(userCompanyName || "");
    // const [skills, setS] = useState(userSkills || []);
    // const [schoolName,setSchoolName] = useState(userSchool || "");
    // const [livingIn , setLI] = useState(userLivingIn || "");
    // const [socialLinks, setSL] = useState({
    //   linkedin: userSocialLinks?.linkedin || '',
    //   github: userSocialLinks?.github || '',
    //   portfolio: userSocialLinks?.portfolio || ''
    // });

    
    // Example for first name
    const [fName, setFName] = useState("");
    useEffect(() => {
        setFName(userFirstName || "");
    }, [userFirstName]);

    // Repeat this for all fields
    const [lName, setLName] = useState("");
    useEffect(() => {
        setLName(userLastName || "");
    }, [userLastName]);

    const [emailId, setEId] = useState("");
    useEffect(() => {
        setEId(userEmailId || "");
    }, [userEmailId]);

    const [gender, setG] = useState("");
    useEffect(() => {
        setG(userGender || "");
    }, [userGender]);

    const [dateOfBirth, setdateOfBirth] = useState("");
    useEffect(() => {
        setdateOfBirth(userDateOfBirth || "");
    }, [userDateOfBirth]);

    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(userUploadedImages || []);
    }, [userUploadedImages]);

    const [bio, setB] = useState("");
    useEffect(() => {
        setB(userBio || "");
    }, [userBio]);

    const [jobTitle, setJTitle] = useState("");
    useEffect(() => {
        setJTitle(userJobTitleName || "");
    }, [userJobTitleName]);

    const [company, setC] = useState("");
    useEffect(() => {
        setC(userCompanyName || "");
    }, [userCompanyName]);

    const [schoolName, setSchoolName] = useState("");
    useEffect(() => {
        setSchoolName(userSchool || "");
    }, [userSchool]);

    const [livingIn, setLI] = useState("");
    useEffect(() => {
        setLI(userLivingIn || "");
    }, [userLivingIn]);

    const [skills, setS] = useState([]);
    useEffect(() => {
        setS(userSkills || []);
    }, [userSkills]);

    const [promptContent, setPromptContent] = useState([]);
    useEffect(() => {
        setPromptContent(userPromptContent || []);
    }, [userPromptContent]);

    const [socialLinks, setSL] = useState({
        linkedin: '',
        github: '',
        portfolio: ''
    });
    useEffect(() => {
        setSL({
            linkedin: userSocialLinks?.linkedin || '',
            github: userSocialLinks?.github || '',
            portfolio: userSocialLinks?.portfolio || ''
        });
    }, [userSocialLinks]);


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
        // Individual field validations with specific messages
        if (!fName.trim()) {
            errorMessage("First Name cannot be empty.");
            return;
        }

        if (!lName.trim()) {
            errorMessage("Last Name cannot be empty.");
            return;
        }

        if (!emailId.trim()) {
            errorMessage("Email ID cannot be empty.");
            return;
        }

        if (!gender.trim()) {
            errorMessage("Please select a Gender.");
            return;
        }

        if (!dateOfBirth.trim()) {
            errorMessage("Date of Birth cannot be empty.");
            return;
        }

        if (!bio.trim()) {
            errorMessage("Bio cannot be empty.");
            return;
        }

        if (!skills.length) {
            errorMessage("Please add at least one Skill.");
            return;
        }

        try {

            setIsSaving(true); // start shimmer
            setSaveSuccess(false);
            handleApplyChangesClick(); // Apply changes to the Redux store

            console.log("I am in delete Function !!");

            const response = await axios.post(import.meta.env.VITE_BASE_URL + "profile/delete/savedImages", {
                uploadedImages: images.filter(Boolean),
                profileImage,
            },{withCredentials: true});

            console.log(response);

            const res = await axios.patch(import.meta.env.VITE_BASE_URL + "profile/edit", {
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
            const errMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            errorMessage(errMessage);
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