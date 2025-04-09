import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../utils/Constants/constants'
import { errorMessage } from '../../utils/ShowMessage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../utils/ReduxStore/userSlice'

const Menu = () => {
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
            const response = await axios.post(BASE_URL + "logout" , {withCredentials: true});
            console.log(response);
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            errorMessage(error.message);
        }
    }

    return (
        <div className="absolute bg-amber-600 text-black w-40 p-2 rounded-md right-0 m-1 border border-gray-700" >
            <div className="flex items-center hover:bg-slate-200 hover:rounded-md cursor-pointer hover:shadow hover:shadow-black active:shadow-gray-600"
                onClick={handleProfileClick}
            >
                <img alt="userProfileIcon" src={profileImage} className="h-6 w-6 rounded-full m-2 object-contain" />
                {/* <button onClick={handleProfileClick} > */}
                <button className="cursor-pointer" >
                    Profile
                </button>
            </div>
            <div className="flex items-center hover:bg-slate-200 hover:rounded-md hover:bg-opacity-40 cursor-pointer hover:shadow hover:shadow-black active:shadow-gray-600"
                onClick={handleConnectionsClick}
            >
                <img alt="userConnectionsIcon" src="/user-connections-icon.png" className="h-6 w-6 rounded-md m-2" />
                {/* <button onClick={handleConnectionsClick} > */}
                <button className="cursor-pointer" >
                    Connections
                </button>
            </div>
            <div className="flex items-center hover:bg-slate-200 hover:rounded-md hover:bg-opacity-40 cursor-pointer hover:shadow hover:shadow-black active:shadow-gray-600"
                onClick={handleRequestsClick}
            >
                <img alt="userRequestsIcon" src="/user-requests-icon.png" className="h-6 w-6 m-2 object-fill rounded-md" />
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