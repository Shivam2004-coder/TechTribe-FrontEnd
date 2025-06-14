import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../utils/Constants/constants'
import { errorMessage } from '../../utils/ShowMessage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {resetProfile} from "../../utils/ReduxStore/profileSlice";

const Menu = ({setIsClicked}) => {

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

    const handleHomeClick = () => {
        if ( location !== "/tribe" ) {
            navigate("/tribe");
        }
        setIsClicked(false);
    }
    const handleProfileClick = () => {
        if ( location !== "/profile" ) {
            navigate("/profile");
        }
        setIsClicked(false);
    }
    const handleConnectionsClick = () => {
        if ( location !== "/connections" ) {
            navigate("/connections");
        }
        setIsClicked(false);
    }
    const handleRequestsClick = () => {
        if ( location !== "/requests" ) {
            navigate("/requests");
        }
        setIsClicked(false);
    }
    const handlePremiumClick = () => {
        if( location !== "/premium" ){
            navigate("/premium");
        }
        setIsClicked(false);
    }
    const handleAboutClick = () => {
        setIsClicked(false);
    }
    const handleContactUsClick = () => {
        setIsClicked(false);
    }
    const handleLogoutClick = async () => {
        try {
            const response = await axios.post(BASE_URL + "logout" , {} , {withCredentials: true});
            console.log(response);
            dispatch(resetProfile());
            navigate("/login");
        } catch (error) {
            errorMessage(error.message);
        }
    }

    // const connectionImage = "TechTribe_User_Profile_Avatar/Logos/Logo_eb57da91-f036-4ee9-b795-94506c77a832";
    // const requestImage = "TechTribe_User_Profile_Avatar/Logos/Logo_250b49e3-cb7f-4603-82f6-5984591bd84d";

    return (
        // <div className="h-screen right-0 m-1" >
        <div className="right-0 top-20 bottom-0 max-w-md w-full z-30 p-2 rounded-tl-lg rounded-bl-lg">
            <div className='flex flex-row justify-between mb-5' >
                <div className='flex flex-row justify-between' >
                    <AdvancedImage cldImg={cld.image(profileImage).resize(fill().width(250).height(250))} 
                                className="h-9 w-9 mr-2 object-contain rounded-full shadow-lg shadow-black"
                    />
                    <div>
                        <h1 className='font-bold' >{firstName} {lastName}</h1>
                        <h2>{emailId}</h2>
                    </div>
                </div>
                <button 
                    className='hover:bg-gray-500 hover:rounded-lg cursor-pointer flex items-center justify-center p-2'
                    onClick={() => {
                    setIsClicked(false);
                }} >
                    <i className="material-icons">close</i>
                </button>
            </div>
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
                onClick={handleHomeClick}
            >
                <i className="material-icons mr-1">home</i>
                <button className="cursor-pointer" >
                    Home
                </button>
            </div>
            <hr className="font-bold border-black border-dashed my-1" />
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1 "
                onClick={handleProfileClick}
            >
                <i className="material-icons mr-1">account_circle</i>
                <button className="cursor-pointer" >
                    Profile
                </button>
            </div>
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm hover:bg-opacity-40 cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
                onClick={handleConnectionsClick}
            >
                <i className="material-icons mr-1">hub</i>
                <button className="cursor-pointer" >
                    Connections
                </button>
            </div>
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm hover:bg-opacity-40 cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
                onClick={handleRequestsClick}
            >
                <i className="material-icons mr-1">person_add</i>
                <button className="cursor-pointer" >
                    Requests
                </button>
            </div>
            <hr className="font-bold border-black border-dashed my-1" />
            <div className="flex items-center justify-between hover:bg-gray-400 select-none hover:rounded-sm cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
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
            <hr className="font-bold border-black border-dashed my-1" />
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm hover:bg-opacity-40 cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
                onClick={handleAboutClick}
            >
                <i className="material-icons mr-1">info</i>
                <button className="cursor-pointer" >
                    About
                </button>
            </div>
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm hover:bg-opacity-40 cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
                onClick={handleContactUsClick}
            >
                <i className="material-icons mr-1">help</i>
                <button className="cursor-pointer" >
                    Contact Us
                </button>
            </div>
            <hr className="font-bold border-black border-dashed my-1" />
            <div className="flex items-center hover:bg-gray-400 select-none hover:rounded-sm hover:bg-opacity-40 cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black
                            p-1"
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