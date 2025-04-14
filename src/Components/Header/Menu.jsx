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
    const profileImage = useSelector((store) => store.profile.profileImage);

    const handleProfileClick = () => {
        if ( location !== "/profile" ) {
            navigate("/profile");
        }
    }

    const handleConnectionsClick = () => {
        if ( location !== "/connections" ) {
            navigate("/connections");
        }
        // if ( location !== "/onboarding" ) {
        //     navigate("/onboarding");
        // }
    }

    const handleRequestsClick = () => {
        if ( location !== "/requests" ) {
            navigate("/requests");
        }
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

    const connectionImage = "TechTribe_User_Profile_Avatar/Logos/Logo_eb57da91-f036-4ee9-b795-94506c77a832";
    const requestImage = "TechTribe_User_Profile_Avatar/Logos/Logo_250b49e3-cb7f-4603-82f6-5984591bd84d";

    return (
        <div className="absolute bg-amber-600 text-black w-40 p-2 rounded-md right-0 m-1 border border-gray-700" >
            <div className="flex items-center hover:bg-slate-200 hover:rounded-md cursor-pointer hover:shadow hover:shadow-black active:shadow-gray-600"
                onClick={handleProfileClick}
            >
                {/* <img alt="userProfileIcon" src={profileImage} className="h-6 w-6 rounded-full m-2 object-contain" /> */}
                <div className="h-6 w-6 object-contain m-2 rounded-lg" >
                    <AdvancedImage cldImg={cld.image(profileImage).resize(fill().width(250).height(250))} />
                </div>
                {/* <button onClick={handleProfileClick} > */}
                <button className="cursor-pointer" >
                    Profile
                </button>
            </div>
            <div className="flex items-center hover:bg-slate-200 hover:rounded-md hover:bg-opacity-40 cursor-pointer hover:shadow hover:shadow-black active:shadow-gray-600"
                onClick={handleConnectionsClick}
            >
                {/* <img alt="userConnectionsIcon" src="/user-connections-icon.png" className="h-6 w-6 rounded-md m-2" /> */}
                <div className="h-6 w-6 object-contain m-2 rounded-lg" >
                    <AdvancedImage cldImg={cld.image(connectionImage).resize(fill().width(250).height(250))} />
                </div>
                {/* <button onClick={handleConnectionsClick} > */}
                <button className="cursor-pointer" >
                    Connections
                </button>
            </div>
            <div className="flex items-center hover:bg-slate-200 hover:rounded-md hover:bg-opacity-40 cursor-pointer hover:shadow hover:shadow-black active:shadow-gray-600"
                onClick={handleRequestsClick}
            >
                {/* <img alt="userRequestsIcon" src="/user-requests-icon.png" className="h-6 w-6 m-2 object-fill rounded-md" /> */}
                <div className="h-6 w-6 object-contain m-2 rounded-lg" >
                    <AdvancedImage cldImg={cld.image(requestImage).resize(fill().width(250).height(250))} />
                </div>
                {/* <button onClick={handleRequestsClick} > */}
                <button className="cursor-pointer" >
                    Requests
                </button>
            </div>
            <hr className="font-bold border-black border-dashed my-1" />
            <p 
                className="text-center cursor-pointer text-red-600 hover:font-bold hover:underline active:font-normal"
                onClick={handleLogoutClick}
            >
                LogOut
            </p>
        </div>
    )
}

export default Menu