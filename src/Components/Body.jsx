import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import RefreshHandler from "./RefreshHandler"
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Onboarding from "./Onboarding/Onboarding";
import Connections from "./Connections/Connections";
import Requests from "./Requests/Requests";
import Chat from "./Chat/Chat";
import Premium from "./Premium/Premium";
import Tribe from "./Tribe/Tribe";
import Interested from "./Interested/Interested";
import Ignored from "./Ignored/Ignored";
import Settings from "./Settings/Settings";

import AboutUs from "./Footer/FooterPages/AboutUs";
import Privacy from "./Footer/FooterPages/Privacy";
import Terms from "./Footer/FooterPages/Terms";
import CookiePolicy from "./Footer/FooterPages/CookiePolicy";
import IntellectualProperty from "./Footer/FooterPages/IntellectualProperty";
import Careers from "./Footer/FooterPages/Careers";
import TechBlog from "./Footer/FooterPages/TechBlog";
import FAQ from "./Footer/FooterPages/FAQ";
import Contact from "./Footer/FooterPages/Contact";
import PressRoom from "./Footer/FooterPages/PressRoom";
import PromoCode from "./Footer/FooterPages/PromoCode";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";

const Body = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
        <Login />
      </GoogleOAuthProvider>
    )
  }
  const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes  >
        {/* ✅ Parent Route with Layout */}
        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="login" element={<GoogleAuthWrapper />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="tribe" element={<Tribe />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections/>} />
          <Route path="requests" element={<Requests/>} />
          <Route path="interested" element={<Interested />} />
          <Route path="ignored" element={<Ignored />} />
          <Route path="chat/:targetUserId" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="premium" element={<Premium/>} />

          <Route path="about-us" element={<AboutUs/>} />

          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="intellectual-property" element={<IntellectualProperty />} />

          <Route path="careers" element={<Careers />} />
          <Route path="tech-blog" element={<TechBlog />} />

          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="press-room" element={<PressRoom />} />
          <Route path="promo-code" element={<PromoCode />} />

        </Route>
      </Routes>
    </>
  )
};

export default Body;