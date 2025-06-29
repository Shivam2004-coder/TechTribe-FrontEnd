import React from "react";
import GoogleButton from "react-google-button";
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

const Form = (props) => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    const {
        isSignIn,
        setSignIn,
        userName,
        setUserName,
        lastName,
        setLastName,
        emailId,
        setEmailId,
        password,
        setPassword,
        canSeePassword,
        setCanSeePassword,
        handleSignInSubmitButton,
        handleSignUpSubmitButton,
        handleGoogleSignInAndSignUp
    } = props;

    return (
        <div className="flex justify-center m-2">
        <form 
            className="w-96 bg-gradient-to-r from-[#1f1f1f] via-[#2e2e2e] to-[#3d3d3d] shadow-2xl shadow-black p-7 flex flex-col items-center"
            onSubmit={(e) => e.preventDefault()}
        >
            <h1 className="font-bold text-2xl">
            {isSignIn ? "Sign Up" : "Sign In"}
            </h1>
            <div className="w-full flex flex-col items-start">
            {isSignIn && (
                <>
                <div className="w-full flex flex-col mb-2">
                    <label>FirstName</label>
                    <input
                    type="text"
                    placeholder="Enter Your FirstName"
                    className="p-2 text-white bg-gray-600 shadow-inner shadow-black"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col mb-2">
                    <label>LastName</label>
                    <input
                    type="text"
                    placeholder="Enter Your LastName"
                    className="p-2 shadow-inner shadow-black text-white bg-gray-600"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                </>
            )}
            <div className="w-full flex flex-col mb-2">
                <label>Email Id</label>
                <input
                type="text"
                placeholder="Enter Your Email"
                className="p-2 shadow-inner shadow-black text-white bg-gray-600"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                />
            </div>
            <div className="w-full flex flex-col mb-2">
                <label>Password</label>
                <div className="relative  w-full flex items-center">
                    <input
                        type={canSeePassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        className="p-2 shadow-inner shadow-black text-white bg-gray-600 pr-10 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="h-4 w-4 right-2 cursor-pointer absolute" 
                        onClick={() => setCanSeePassword(!canSeePassword)}
                    >
                        <AdvancedImage cldImg={cld.image(canSeePassword ? "TechTribe_User_Profile_Avatar/Logos/Logo_dc116e4b-856a-4ec0-9c74-2dbe7e9ac3a8" : "TechTribe_User_Profile_Avatar/Logos/Logo_06ba8b64-1d54-4064-9a67-198c1e761193").resize(fill().width(250).height(250))} />
                    </div>
                    {/* <img
                        src={}
                        alt="Toggle visibility"
                        className="h-4 w-4 right-2 cursor-pointer absolute"
                        
                    /> */}
                </div>
            </div>
            </div>

            <div className="w-full flex flex-col items-center mt-2">
                <button
                    className="p-3 w-5/12 shadow shadow-yellow-950 text-lg bg-yellow-600 cursor-pointer 
                                hover:rounded-full transition-all duration-300 ease-in-out hover:bg-yellow-700 active:bg-yellow-600"
                    onClick={ isSignIn ? handleSignUpSubmitButton :  handleSignInSubmitButton}
                >
                    {isSignIn ? "Sign Up" : "Sign In"}
                </button>

                { !isSignIn && 
                    <>
                        <p className="mt-6 text-yellow-500">----- OR -----</p>
                        
                        <GoogleButton
                            onClick={handleGoogleSignInAndSignUp}
                            label= "Sign In with Google"
                        />
                    </>
                }


                <p className="text-white mt-7">
                    {isSignIn ? "Already Registered ? " : "New to Tech Tribe ? "}
                    <span
                    onClick={() => setSignIn(!isSignIn)}
                    className="text-white hover:underline hover:text-blue-400 active:text-white cursor-pointer font-bold"
                    >
                    {isSignIn ? "Sign In" : "Sign Up"}
                    </span>
                </p>
            </div>
        </form>
        </div>
    );
};

export default Form;
