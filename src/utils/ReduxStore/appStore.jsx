import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import setReducer from "./setSlice";
import profileReducer from "./profileSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        profile: profileReducer,
        set: setReducer,
        connections: connectionReducer,
        requests: requestReducer
    },
});

export default appStore;