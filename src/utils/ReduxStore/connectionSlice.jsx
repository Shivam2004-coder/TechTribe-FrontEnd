import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connectionContent: null,
    },
    reducers:{
        addConnection: (state , action) => {
            state.connectionContent = action.payload;
        },
        removeConnection: (state) => {
            state.connectionContent = null;
        },
    }
});

export const { addConnection , removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;