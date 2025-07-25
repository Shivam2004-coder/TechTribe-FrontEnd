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
        removeC: (state, action) => {
            state.connectionContent = state.connectionContent.filter(
                (conn) => conn._id !== action.payload
            );
        },
        removeConnection: (state) => {
            state.connectionContent = null;
        },
    }
});

export const { addConnection , addCurrentConnection , removeC , removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;