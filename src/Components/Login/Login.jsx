import React, { useEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import emailPasswordValidate from "../../utils/Validations/emailPasswordValidate";
import { invalidMessage, successMessage } from "../../utils/ShowMessage";
import { setFirstName, setLastName, setEmailId } from "../../utils/ReduxStore/profileSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { fetchAndStoreUserProfile } from "../../CustomHooks/fetchAndStoreUserProfile";

const Login = () => {
  const [isSignIn, setSignIn] = useState(null);
  const [userName, setUName] = useState("Shivam");
  const [lastName, setLName] = useState("Vaishnav");
  const [emailId, setEId] = useState("harsh@example.com");
  const [password, setPassword] = useState("Harsh@123");
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // shimmer state
  const gender = useSelector((store) => store.profile.gender); // 👈 may be empty initially

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

      const result = await axios.post(import.meta.env.VITE_BASE_URL + "login", { emailId, password }, { withCredentials: true });
      const token = result.data.token;
      localStorage.setItem('user-info',JSON.stringify({ token }));
      successMessage("You are successfully Logged In");
      await fetchAndStoreUserProfile(dispatch);

      // 🚀 Do NOT wait for RefreshHandler — redirect now
      if (gender && gender.length > 0) {
        navigate("/tribe");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      const errMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      console.log(error);
      console.log("ERROR in handleSignInButton : "+error.message);
      invalidMessage(errMessage);
    }
  };

  const handleSignUpSubmitButton = async () => {
    try {
      const message = emailPasswordValidate(userName, lastName, emailId, password, isSignIn);
      if (message) return invalidMessage(message);

      const result = await axios.post(import.meta.env.VITE_BASE_URL + "signup", {
        firstName: userName, lastName, emailId, password
      }, { withCredentials: true });

      const token = result.data.token;
      localStorage.setItem('user-info',JSON.stringify({ token }));

      dispatch(setFirstName(userName));
      dispatch(setLastName(lastName));
      dispatch(setEmailId(emailId));

      await fetchAndStoreUserProfile(dispatch);

      navigate("/onboarding");
    } catch (error) {
      const errMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      invalidMessage(errMessage);
    }
  };

  const responseGoogle = async (authResult) => {
    try {

      if (authResult["code"]) {
				const result = await axios.get( `${import.meta.env.VITE_BASE_URL}auth/google?code=${authResult.code}` , { withCredentials: true } );
        successMessage(result.data.message);

        const token = result.data.token;
        localStorage.setItem('user-info',JSON.stringify({ token }));
        
        await fetchAndStoreUserProfile(dispatch);

        // 🚀 Do NOT wait for RefreshHandler — redirect now
        if (gender && gender.length > 0) {
          navigate("/tribe");
        } else {
          navigate("/onboarding");
        }

			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
      
      // console.log("Auth result : "+authResult);
    } catch (error) {
      console.log("Error while requesting google code : "+error);
      const errMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      invalidMessage(errMessage);
    }
  };

  const handleGoogleSignInAndSignUp = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  });

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
            <div className="w-96 p-6 rounded-xl bg-gradient-to-r from-[#1f1f1f] via-[#2e2e2e] to-[#3d3d3d] space-y-6  shadow-md">

              {/* Title */}
              <div className="h-10 w-1/2 border border-black/2 mx-auto bg-gray-600 rounded-md relative overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent shimmer" />
              </div>

              {/* First Name Input */}
              <div className="h-10 w-full border border-black/2 bg-gray-600 rounded-md relative overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer" />
              </div>

              {/* Email Input */}
              <div className="h-10 w-full border border-black/2 bg-gray-600 rounded-md relative overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent shimmer" />
              </div>

              {/* Password Input */}
              <div className="h-10 w-full rounded-md relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#1f1f1f] via-[#2e2e2e] to-[#3d3d3d]" /> */}
              </div>

              {/* Submit Button */}
              <div className="h-10 w-1/2 border border-black/2 mx-auto bg-gray-600 rounded-md relative overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent shimmer" />
              </div>

              {/* Google Button */}
              <div className="h-10 w-full border border-black/2 bg-gray-600 rounded-md relative overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent shimmer" />
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
          handleGoogleSignInAndSignUp={handleGoogleSignInAndSignUp}
        />
      </div>
      )}
    </div>
  );
};

export default Login;
