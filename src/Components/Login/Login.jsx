import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import emailPasswordValidate from "../../utils/Validations/emailPasswordValidate";
import { invalidMessage } from "../../utils/ShowMessage";
import { useDispatch } from "react-redux";
// import { addUser } from "../../utils/ReduxStore/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../utils/Constants/constants";
import { setEmailId, setFirstName, setLastName } from "../../utils/ReduxStore/profileSlice";

const Login = () => {
    const [isSignIn , setSignIn] = useState(null);
    const [userName , setUName] = useState("Shivam");
    const [lastName , setLName] = useState("Vaishnav");
    const [emailId , setEId] = useState("shivamv@example.com");
    const [password , setPassword] = useState("Shivam@123");
    const [canSeePassword , setCanSeePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignInSubmitButton = async () => {
        try {

          // validating the user entered data
          console.log(emailId , password);

          const message = emailPasswordValidate( userName , lastName , emailId , password , isSignIn );
          console.log(message);
          if ( message ) {
            invalidMessage(message);
            return ;
          }

          // fetching data from mongo DB

          await axios.post(
              BASE_URL + "login" , 
              {
                emailId,
                password
              },
              {
                withCredentials: true
              }
          )
          .then((res) => {
            // dispatch(addUser(res.data));
            navigate("/profile");
            console.log("This is Login Page !!");
            console.log(res);
          });
        } catch (error) {
          invalidMessage(error.message);
        }
    }

    const handleSignUpSubmitButton = async () => {
      try {
        // validating the user entered data
        // console.log(emailId , password);

        const message = emailPasswordValidate( userName , lastName , emailId , password , isSignIn );
        console.log(message);
        if ( message ) {
          invalidMessage(message);
          return ;
        }

        // fetching data from mongo DB

        const res = await axios.post(
            BASE_URL + "signup" , 
            {
              firstName: userName,
              lastName,
              emailId,
              password
            },
            {
              withCredentials: true
            }
        );
        dispatch(setFirstName(userName));
        dispatch(setLastName(lastName));
        dispatch(setEmailId(emailId));
        navigate("/onboarding");
        console.log("This is Login Page !!");
        console.log(res);
      } catch (error) {
        invalidMessage(error.message);
      }
    }


    return (
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
    );
};

export default Login;
