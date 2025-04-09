import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requestContent: [],
    },
    reducers:{
        addRequest: (state , action) => {
            state.requestContent = action.payload;
        },
        removeRequest: (state, action) => {
            // console.log("Before removal:", state.requestContent);
            const newArray = state.requestContent.filter((request) => request.fromUserId._id !== action.payload);
            // console.log("After removal:", newArray);
            state.requestContent = newArray;
        }
    }
});

export const { addRequest , removeRequest } = requestSlice.actions;

export default requestSlice.reducer;