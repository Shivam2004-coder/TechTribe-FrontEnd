import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"Feed",
    initialState: {
        feedContent : null,
    },
    reducers: {
        addFeed:(state ,action) => {
            state.feedContent = action.payload;
        },
        removeFeed: (state , action) => {
            const newFeed = state?.feedContent.filter((user) => user._id !== action.payload);
            state.feedContent = newFeed;
        },
    },
});

export const { addFeed , removeFeed } = feedSlice.actions;

export default feedSlice.reducer;