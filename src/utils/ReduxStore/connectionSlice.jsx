import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connectionContent: null,
        currentConnection: null,
    },
    reducers:{
        addConnection: (state , action) => {
            state.connectionContent = action.payload;
        },
        addCurrentConnection: (state , action) => {
            state.currentConnection = action.payload;
        },
        removeConnection: (state) => {
            state.connectionContent = null;
        },
    }
});

export const { addConnection , addCurrentConnection , removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;