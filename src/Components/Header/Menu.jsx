import axios from 'axios'
import React from 'react'
import { errorMessage } from '../../utils/ShowMessage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {resetProfile} from "../../utils/ReduxStore/profileSlice";
import { toggleMenu } from '../../utils/ReduxStore/setSlice'

const Menu = () => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    // const  location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const firstName = useSelector((store) => store.profile.firstName);
    const lastName = useSelector((store) => store.profile.lastName);
    const emailId = useSelector((store) => store.profile.emailId);
    const profileImage = useSelector((store) => store.profile.profileImage);
    const membershipType = useSelector((store) => store.profile.membershipType);
    const displayMode = useSelector((store) => store.profile.displayMode);

    const handleHomeClick = () => {
        if ( location !== "/tribe" ) {
            navigate("/tribe");
        }
        dispatch(toggleMenu(false));
    }
    const handleProfileClick = () => {
        if ( location !== "/profile" ) {
            navigate("/profile");
        }
        dispatch(toggleMenu(false));
    }
    const handleConnectionsClick = () => {
        if ( location !== "/connections" ) {
            navigate("/connections");
        }
        dispatch(toggleMenu(false));
    }
    const handleRequestsClick = () => {
        if ( location !== "/requests" ) {
            navigate("/requests");
        }
        dispatch(toggleMenu(false));
    }
    const handleInterestedClick = () => {
        if ( membershipType === "Free" ) {
            if ( location !== "/premium" ) {
                navigate("/premium");
            }
        }
        else{
            if ( location !== "/interested" ) {
                navigate("/interested");
            }
        }
        dispatch(toggleMenu(false));
    }
    const handleIgnoredClick = () => {
        if ( membershipType === "Elite" ) {
            if ( location !== "/ignored" ) {
                navigate("/ignored");
            }
        }
        else{
            if ( location !== "/premium" ) {
                navigate("/premium");
            }
        }
        dispatch(toggleMenu(false));
    }
    const handlePremiumClick = () => {
        if( location !== "/premium" ){
            navigate("/premium");
        }
        dispatch(toggleMenu(false));
    }
    const handleAboutClick = () => {
        if ( location !== "/about-us" ) {
            navigate("/about-us");
        }
        dispatch(toggleMenu(false));
    }
    const handleContactUsClick = () => {
        if ( location !== "/contact" ) {
            navigate("/contact");
        }
        dispatch(toggleMenu(false));
    }
    const handleSettingsClick = () => {
        if ( location !== "/settings" ) {
            navigate("/settings");
        }
        dispatch(toggleMenu(false));
    }
    const handleLogoutClick = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL + "logout" , {} , {withCredentials: true});
            console.log(response);
            dispatch(resetProfile());

            localStorage.removeItem('user-info');
            navigate("/login");
        } catch (error) {
            errorMessage(error.message);
        }
    }

    // const connectionImage = "TechTribe_User_Profile_Avatar/Logos/Logo_eb57da91-f036-4ee9-b795-94506c77a832";
    // const requestImage = "TechTribe_User_Profile_Avatar/Logos/Logo_250b49e3-cb7f-4603-82f6-5984591bd84d";
    const style = "flex items-center hover:bg-gray-400 select-none hover:rounded-sm cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black p-1";
    const lineStyle = `font-bold ${ displayMode === "Light" ? "border-black" : "border-white" } border-dashed my-1`;
    const iconStyle = displayMode === "Light" ? "bg-gray-800 shadow-inner shadow-white text-white" : "bg-white shadow-xl shadow-black text-black" ;

    return (
        // <div className="h-screen right-0 m-1" >
        <div className="right-0 top-20 bottom-0 max-w-md w-full p-2 rounded-tl-lg rounded-bl-lg">
            <div className='flex flex-row justify-center mb-5' >
                <div className='flex flex-col  items-center justify-center' >
                    <AdvancedImage cldImg={cld.image(profileImage).resize(fill().width(250).height(250))} 
                                className="h-25 w-25 object-contain rounded-full mb-4 shadow-lg shadow-black"
                    />
                    { membershipType !== "Free" && 
                        <div className={`p-1 absolute top-4 left-4 rounded-full w-13 h-13  flex items-center justify-center ${iconStyle} `} >
                            { membershipType === "Elite" && <i class="fa-solid fa-crown"></i> }
                            { membershipType === "Pro" &&  <i className="material-icons" >workspace_premium</i> }
                        </div>
                    }
                    <div className='flex flex-col items-center justify-center' >
                        <h1 className='font-bold' >{firstName} {lastName}</h1>
                        <h2>{emailId}</h2>
                    </div>
                </div>
                <button 
                    className='hover:bg-gray-500 absolute top-2 right-2 hover:rounded-lg cursor-pointer flex items-center justify-center p-2'
                    onClick={() => {
                    dispatch(toggleMenu(false));
                }} >
                    <i className="material-icons">close</i>
                </button>
            </div>
            <div className={`${style}`}
                onClick={handleHomeClick}
            >
                <i className="material-icons mr-1">home</i>
                <button className="cursor-pointer" >
                    Home
                </button>
            </div>
            <hr className={`${lineStyle}`} />
            <div className={`${style}`}
                onClick={handleProfileClick}
            >
                <i className="material-icons mr-1">account_circle</i>
                <button className="cursor-pointer" >
                    Profile
                </button>
            </div>
            <div className={`${style}`}
                onClick={handleConnectionsClick}
            >
                <i className="material-icons mr-1">hub</i>
                <button className="cursor-pointer" >
                    Connections
                </button>
            </div>
            <div className={`${style}`}
                onClick={handleRequestsClick}
            >
                <i className="material-icons mr-1">person_add</i>
                <button className="cursor-pointer" >
                    Requests
                </button>
            </div>
            <div className={`${style} justify-between`}
                onClick={handleInterestedClick}
            >
                <div className='flex items-center justify-start' >
                     <i className="material-icons mr-1">favorite</i>
                    <button className="cursor-pointer" >
                        Interested
                    </button>
                </div>
                { membershipType === "Free" && <i className='material-icons' >lock</i> }
            </div>
            <div className={`${style} justify-between`}
                onClick={handleIgnoredClick}
            >
                <div className='flex items-center justify-start' >
                    <i className="material-icons mr-1">heart_broken</i>
                    <button className="cursor-pointer" >
                        Ignored
                    </button>
                </div>
                { (membershipType === "Free" || membershipType === "Pro") && (
                    <i className="material-icons">lock</i>
                )}
            </div>
            <hr className={`${lineStyle}`} />
            <div className={`${style} justify-between`}
                onClick={handlePremiumClick}
            >
                <div className='flex items-center'>
                    <i className="material-icons mr-1">diamond</i>
                    <button className="cursor-pointer" >
                        Premium
                    </button>
                </div>
                <p className="border-1 rounded-lg p-1 text-white font-bold gradient-texture  bg-clip-text ">
                    NEW
                </p>
            </div>
            <hr className={`${lineStyle}`} />
            <div className={`${style}`}
                onClick={handleAboutClick}
            >
                <i className="material-icons mr-1">info</i>
                <button className="cursor-pointer" >
                    About
                </button>
            </div>
            <div className={`${style}`}
                onClick={handleContactUsClick}
            >
                <i className="material-icons mr-1">help</i>
                <button className="cursor-pointer" >
                    Contact Us
                </button>
            </div>
            <div className={`${style}`}
                onClick={handleSettingsClick}
            >
                <i className="material-icons mr-1">settings</i>
                <button className="cursor-pointer" >
                    Settings
                </button>
            </div>
            <hr className={`${lineStyle}`} />
            <div className={`${style}`}
                onClick={handleLogoutClick}
            >
                <i className="material-icons mr-1">logout</i>
                <button className="cursor-pointer" >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default Menu