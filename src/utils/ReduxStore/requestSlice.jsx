import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requestContent: [],
        requestInterestedContent: [],
        requestIgnoredContent: [],
    },
    reducers:{
        addRequest: (state , action) => {
            state.requestContent = action.payload;
        },
        addRequestInterested: (state , action) => {
            state.requestInterestedContent = action.payload;
        },
        addRequestIgnored: (state , action) => {
            state.requestIgnoredContent = action.payload;
        },
        removeRequest: (state, action) => {
            // console.log("Before removal:", state.requestContent);
            const newArray = state.requestContent.filter((request) => request.fromUserId._id !== action.payload);
            // console.log("After removal:", newArray);
            state.requestContent = newArray;
        },
        removeRequestInterested: (state , action) => {
            // console.log("Before removal:", state.requestContent);
            const newArray = state.requestInterestedContent.filter((request) => request.fromUserId._id !== action.payload);
            // console.log("After removal:", newArray);
            state.requestInterestedContent = newArray;
        },
        removeRequestIgnored: (state , action) => {
            // console.log("Before removal:", state.requestContent);
            const newArray = state.requestIgnoredContent.filter((request) => request.fromUserId._id !== action.payload);
            // console.log("After removal:", newArray);
            state.requestIgnoredContent = newArray;
        }
    }
});

export const {  
    addRequest , 
    addRequestInterested , 
    addRequestIgnored , 
    removeRequestInterested , 
    removeRequestIgnored , 
    removeRequest 
} = requestSlice.actions;

export default requestSlice.reducer;