import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login/Login";
import Developer from "./Tribe/Tribe";
import Profile from "./Profile/Profile";
import Onboarding from "./Onboarding/Onboarding";
import Connections from "./Connections/Connections";
import Requests from "./Requests/Requests";
import Chat from "./Chat/Chat";
import Premium from "./Premium/Premium";

const Body = () => {
  return (
    <Routes>
      {/* ✅ Parent Route with Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="tribe" element={<Developer />} />
        <Route path="profile" element={<Profile />} />
        <Route path="connections" element={<Connections/>} />
        <Route path="requests" element={<Requests/>} />
        <Route path="chat/:targetUserId" element={<Chat />} />
        <Route path="premium" element={<Premium/>} />

      </Route>
    </Routes>
  );
};

export default Body;