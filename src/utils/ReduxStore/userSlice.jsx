import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState: {
        userContent : null,
    },
    reducers: {
        addUser:(state ,action) => {
            state.userContent = action.payload;
        },
        removeUser: (state) => {
            state.userContent = null;
        },
    },
});

export const { addUser , removeUser } = userSlice.actions;

export default userSlice.reducer;