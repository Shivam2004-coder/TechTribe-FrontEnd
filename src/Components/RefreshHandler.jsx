import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorMessage } from '../utils/ShowMessage';
import { fetchAndStoreUserProfile } from '../CustomHooks/fetchAndStoreUserProfile';
import { useDispatch } from 'react-redux';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
  const checkUserStatus = async () => {
    let token = null;
    try {
      const data = localStorage.getItem('user-info');
      if (data && data !== 'undefined') {
        const parsed = JSON.parse(data);
        token = parsed?.token;
      }
    } catch (err) {
      console.error("Invalid JSON in localStorage", err);
    }

    if (!token) {
      setIsAuthenticated(false);
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
        errorMessage("Please Login !!");
      }
      return;
    }

    setIsAuthenticated(true);

    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "profile/view", { withCredentials: true });
      const userData = res.data.user;
      await fetchAndStoreUserProfile(dispatch);
      

      const hasCompletedOnboarding = !!userData.gender; // Or more checks if needed

      if (location.pathname === '/login' || location.pathname === '/') {
        if (hasCompletedOnboarding) {
          navigate('/tribe', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      }

      // 👤 User is logged in but hasn't finished onboarding
      if (!hasCompletedOnboarding) {
        if (location.pathname !== "/onboarding") {
          errorMessage("Please complete the onboarding details.");
          navigate("/onboarding");
        }
        return;
      }

      // // ✅ User is authenticated and has completed onboarding
      // if (location.pathname !== "/tribe") {
      //   navigate("/tribe");
      // }


      if (location.pathname === '/onboarding' && hasCompletedOnboarding) {
        navigate('/tribe', { replace: true });
      }



    } catch (err) {

      // console.log("Session expired or user not found"+err.message);
      localStorage.removeItem('user-info');
      setIsAuthenticated(false);
      navigate('/login', { replace: true });

      const errMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      // console.log("ERROR in handleSignInButton : "+err.message);
      errorMessage(errMessage);
    }
  };

  checkUserStatus();
}, [location.pathname, setIsAuthenticated, navigate, dispatch]);

  return null;
}

export default RefreshHandler;
