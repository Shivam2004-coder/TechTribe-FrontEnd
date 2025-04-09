import {createSlice} from "@reduxjs/toolkit";

const setSlice = createSlice({
    name:"Set",
    initialState: {
        imageUrl : "/Usericon.jpg",
        showAvatarPage : false,
        showEditPage : true,
        showPreviewPage : false,
    },
    reducers: {
        addImageUrl:(state ,action) => {
            state.imageUrl = action.payload;
        },
        OnlyShowAvatarPage: (state) => {
            state.showAvatarPage = true;
            state.showEditPage = false;
            state.showPreviewPage = false;
        },
        OnlyShowEditPage: (state) => {
            state.showAvatarPage = false;
            state.showEditPage = true;
            state.showPreviewPage = false;
        },
        OnlyShowPreviewPage: (state) => {
            state.showAvatarPage = false;
            state.showEditPage = false;
            state.showPreviewPage = true;
        }
    },
});

export const { addImageUrl , OnlyShowAvatarPage , OnlyShowEditPage , OnlyShowPreviewPage } = setSlice.actions;

export default setSlice.reducer;