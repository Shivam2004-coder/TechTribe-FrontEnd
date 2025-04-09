import React from "react";
import GoogleButton from "react-google-button";

const Form = (props) => {
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
        handleSignUpSubmitButton
    } = props;

    return (
        <div className="flex justify-center m-2">
        <form 
            className="w-96 bg-[oklch(0.38_0.07_18.95_)] rounded-md shadow shadow-black p-7 flex flex-col items-center"
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
                    className="p-2 rounded-md text-white bg-gray-600 shadow-inner shadow-black"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col mb-2">
                    <label>LastName</label>
                    <input
                    type="text"
                    placeholder="Enter Your LastName"
                    className="p-2 shadow-inner shadow-black rounded-md text-white bg-gray-600"
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
                className="p-2 shadow-inner shadow-black rounded-md text-white bg-gray-600"
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
                        className="p-2 shadow-inner shadow-black rounded-md text-white bg-gray-600 pr-10 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                        src={canSeePassword ? "/open-eye.png" : "/hidden.png"}
                        alt="Toggle visibility"
                        className="h-4 w-4 right-2 cursor-pointer absolute"
                        onClick={() => setCanSeePassword(!canSeePassword)}
                    />
                </div>
            </div>
            </div>

            <div className="w-full flex flex-col items-center mt-2">
                <button
                    className="p-3 w-5/12 shadow shadow-yellow-950 text-lg rounded-md bg-yellow-600 cursor-pointer hover:bg-yellow-700 active:bg-yellow-600"
                    onClick={ isSignIn ? handleSignUpSubmitButton :  handleSignInSubmitButton}
                >
                    {isSignIn ? "Sign Up" : "Sign In"}
                </button>

                <p className="mt-6 text-yellow-500">----- OR -----</p>
                
                <GoogleButton
                    label= {isSignIn ? "Sign Up with Google" : "Sign In with Google" }
                />

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
