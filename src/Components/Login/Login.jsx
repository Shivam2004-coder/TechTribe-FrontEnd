import React, { useEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/Constants/constants";
import emailPasswordValidate from "../../utils/Validations/emailPasswordValidate";
import { invalidMessage } from "../../utils/ShowMessage";
import {
  setFirstName, setLastName, setEmailId, setGender, setDateOfBirth,
  setPromptUserContent, setUploadedImages, setProfileImage, setBio,
  setJobTitle, setCompanyName, setSchool, setLivingIn, setSkills,
  setGithubLink, setLinkedinLink, setPortfolioLink, setMembershipType,
  setSwipes, setChatThemeImage, setWallpaperImage, setDisplayMode
} from "../../utils/ReduxStore/profileSlice";

const Login = () => {
  const [isSignIn, setSignIn] = useState(null);
  const [userName, setUName] = useState("Shivam");
  const [lastName, setLName] = useState("Vaishnav");
  const [emailId, setEId] = useState("shivamv@example.com");
  const [password, setPassword] = useState("Shivam@123");
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // shimmer state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate page load complete
    }, 1500); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignInSubmitButton = async () => {
    try {
      const message = emailPasswordValidate(userName, lastName, emailId, password, isSignIn);
      if (message) return invalidMessage(message);

      await axios.post(BASE_URL + "login", { emailId, password }, { withCredentials: true });
      window.location.href = "/tribe";
    } catch (error) {
      invalidMessage(error.message);
    }
  };

  const handleSignUpSubmitButton = async () => {
    try {
      const message = emailPasswordValidate(userName, lastName, emailId, password, isSignIn);
      if (message) return invalidMessage(message);

      const res = await axios.post(BASE_URL + "signup", {
        firstName: userName, lastName, emailId, password
      }, { withCredentials: true });

      const data = res.data.data;
      dispatch(setFirstName(userName));
      dispatch(setLastName(lastName));
      dispatch(setEmailId(emailId));
      dispatch(setGender(data.gender || ''));
      dispatch(setDateOfBirth(data.dateOfBirth || ''));
      dispatch(setPromptUserContent(data.promptContent || []));
      dispatch(setUploadedImages(data.uploadedImages || []));
      dispatch(setProfileImage(data.profileImage || ''));
      dispatch(setBio(data.bio || ''));
      dispatch(setJobTitle(data.jobTitle || ''));
      dispatch(setCompanyName(data.companyName || ''));
      dispatch(setSchool(data.school || ''));
      dispatch(setLivingIn(data.livingIn || ''));
      dispatch(setSkills(data.skills || []));
      dispatch(setGithubLink(data.socialLinks?.github || ''));
      dispatch(setLinkedinLink(data.socialLinks?.linkedin || ''));
      dispatch(setPortfolioLink(data.socialLinks?.portfolio || ''));
      dispatch(setMembershipType(data.membershipType || ''));
      dispatch(setSwipes(data.swipes || ''));
      dispatch(setChatThemeImage(data.chatThemeImage || ''));
      dispatch(setWallpaperImage(data.wallpaperImage || ''));
      dispatch(setDisplayMode(data.displayMode || ''));
      navigate("/onboarding");
    } catch (error) {
      invalidMessage(error.message);
    }
  };

  // bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e]

  return (
    <div className="h-full w-full p-4 flex items-center justify-center">

       {/* SHIMMER OVERLAY */}
      {isLoading ? (
        <div className="w-full  md:w-1/2 p-8 text-white backdrop-blur-lg bg-white/10">
          <h2 className="text-4xl font-bold mb-4 text-center">
          { !isSignIn ? "Welcome Back!" : "Get Started"}
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          { !isSignIn ? "Login to continue" : "Create your account"}
        </p>
          <div className=" flex items-center justify-center">
            <div className="w-96 p-6 rounded-xl bg-gradient-to-r from-[#1f1f1f] via-[#2e2e2e] to-[#3d3d3d] space-y-6 shadow-md">

              {/* Title */}
              <div className="h-8 w-2/3 bg-gray-600 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>

              {/* First Name Input */}
              <div className="h-10 w-full bg-gray-600 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>

              {/* Email Input */}
              <div className="h-10 w-full bg-gray-600 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>

              {/* Password Input */}
              <div className="h-10 w-full bg-gray-600 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>

              {/* Submit Button */}
              <div className="h-10 w-1/2 mx-auto bg-gray-600 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>

              {/* Google Button */}
              <div className="h-10 w-full bg-gray-600 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
              </div>

            </div>
          </div>

        </div>
      ) : (
      <div className="w-full  md:w-1/2 p-8 text-white backdrop-blur-lg bg-white/10">
        <h2 className="text-4xl font-bold mb-4 text-center">
          { !isSignIn ? "Welcome Back!" : "Get Started"}
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          { !isSignIn ? "Login to continue" : "Create your account"}
        </p>

        <Form
          isSignIn={isSignIn}
          setSignIn={setSignIn}
          userName={userName}
          setUserName={setUName}
          lastName={lastName}
          setLastName={setLName}
          emailId={emailId}
          setEmailId={setEId}
          password={password}
          setPassword={setPassword}
          canSeePassword={canSeePassword}
          setCanSeePassword={setCanSeePassword}
          handleSignInSubmitButton={handleSignInSubmitButton}
          handleSignUpSubmitButton={handleSignUpSubmitButton}
        />
      </div>
      )}
    </div>
  );
};

export default Login;





















// import React, { useState } from "react";
// import Form from "./Form";
// import axios from "axios";
// import emailPasswordValidate from "../../utils/Validations/emailPasswordValidate";
// import { invalidMessage } from "../../utils/ShowMessage";
// import { useDispatch } from "react-redux";
// // import { addUser } from "../../utils/ReduxStore/userSlice";
// import { useNavigate } from "react-router-dom";
// import {BASE_URL} from "../../utils/Constants/constants";
// import { setBio, setChatThemeImage, setCompanyName, setDateOfBirth, setDisplayMode, setEmailId, setFirstName, setGender, setGithubLink, setJobTitle, setLastName, setLinkedinLink, setLivingIn, setMembershipType, setPortfolioLink, setProfileImage, setPromptUserContent, setSchool, setSkills, setSwipes, setUploadedImages, setWallpaperImage } from "../../utils/ReduxStore/profileSlice";

// const Login = () => {
//     const [isSignIn , setSignIn] = useState(null);
//     const [userName , setUName] = useState("Shivam");
//     const [lastName , setLName] = useState("Vaishnav");
//     const [emailId , setEId] = useState("shivamv@example.com");
//     const [password , setPassword] = useState("Shivam@123");
//     const [canSeePassword , setCanSeePassword] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSignInSubmitButton = async () => {
//         try {

//           // validating the user entered data
//           console.log(emailId , password);

//           const message = emailPasswordValidate( userName , lastName , emailId , password , isSignIn );
//           console.log(message);
//           if ( message ) {
//             invalidMessage(message);
//             return ;
//           }

//           // fetching data from mongo DB

//           await axios.post(
//               BASE_URL + "login" , 
//               {
//                 emailId,
//                 password
//               },
//               {
//                 withCredentials: true
//               }
//           )
//           .then(() => {
//             window.location.href = "/tribe";
//           });
//         } catch (error) {
          
//           invalidMessage(error.message);
//         }
//     }

//     const handleSignUpSubmitButton = async () => {
//       try {
//         // validating the user entered data
//         // console.log(emailId , password);

//         const message = emailPasswordValidate( userName , lastName , emailId , password , isSignIn );
//         console.log(message);
//         if ( message ) {
//           invalidMessage(message);
//           return ;
//         }

//         // fetching data from mongo DB

//         const res = await axios.post(
//             BASE_URL + "signup" , 
//             {
//               firstName: userName,
//               lastName,
//               emailId,
//               password
//             },
//             {
//               withCredentials: true
//             }
//         );

//         const data = res.data.data;
//         dispatch(setFirstName(userName));
//         dispatch(setLastName(lastName));
//         dispatch(setEmailId(emailId));
//         dispatch(setGender(data.gender || ''));
//         dispatch(setDateOfBirth(data.dateOfBirth || ''));
//         dispatch(setPromptUserContent(data.promptContent || []));
//         dispatch(setUploadedImages(data.uploadedImages || []));
//         dispatch(setProfileImage(data.profileImage || ''));
//         dispatch(setBio(data.bio || ''));
//         dispatch(setJobTitle(data.jobTitle || ''));
//         dispatch(setCompanyName(data.companyName || ''));
//         dispatch(setSchool(data.school || ''));
//         dispatch(setLivingIn(data.livingIn || ''));
//         dispatch(setSkills(data.skills || []));
//         dispatch(setGithubLink(data.socialLinks?.github || ''));
//         dispatch(setLinkedinLink(data.socialLinks?.linkedin || ''));
//         dispatch(setPortfolioLink(data.socialLinks?.portfolio || ''));
//         dispatch(setMembershipType(data.membershipType || ''));
//         dispatch(setSwipes(data.swipes || ''));
//         dispatch(setChatThemeImage(data.chatThemeImage || ''));
//         dispatch(setWallpaperImage(data.wallpaperImage || ''));
//         dispatch(setDisplayMode(data.displayMode || ''));
//         navigate("/onboarding");
//         console.log("This is Login Page !!");
//         console.log(res);
//       } catch (error) {
//         invalidMessage(error.message);
//       }
//     }

//     // loginBackground

//     return (
//       <div className="flex h-full w-full items-center justify-center " 
//         // style={{
//         //   backgroundImage: "url('/loginBackground.jpg')",
//         //   backgroundSize: "cover",
//         //   backgroundPosition: "center",
//         //   backgroundRepeat: "no-repeat",
//         // }}
//       >
//         <Form 
//           isSignIn={isSignIn}
//           setSignIn={setSignIn}
//           userName={userName}
//           setUserName={setUName}
//           lastName={lastName}
//           setLastName={setLName}
//           emailId={emailId}
//           setEmailId={setEId}
//           password={password}
//           setPassword={setPassword}
//           canSeePassword={canSeePassword}
//           setCanSeePassword={setCanSeePassword}
//           handleSignInSubmitButton={handleSignInSubmitButton}
//           handleSignUpSubmitButton={handleSignUpSubmitButton}
//         />
//       </div>
//     );
// };

// export default Login;
