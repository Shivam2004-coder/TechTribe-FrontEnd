import {createSlice} from "@reduxjs/toolkit";

const setSlice = createSlice({
    name:"Set",
    initialState: {
        imageUrl : "/Usericon.jpg",
        showAvatarPage : false,
        showEditPage : true,
        showPreviewPage : false,
        showChatThemePage : true,
        showWallPaperPage : false,
        showDisplayThemePage : false,
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
        },
        OnlyShowChatThemePage: (state) => {
            state.showChatThemePage = true;
            state.showWallPaperPage = false;
            state.showDisplayThemePage = false;
        },
        OnlyShowWallPaperPage: (state) => {
            state.showChatThemePage = false;
            state.showWallPaperPage = true;
            state.showDisplayThemePage = false;
        },
        OnlyShowDisplayThemePage: (state) => {
            state.showChatThemePage = false;
            state.showWallPaperPage = false;
            state.showDisplayThemePage = true;
        }
    },
});

export const { 
    addImageUrl , 
    OnlyShowAvatarPage , 
    OnlyShowEditPage , 
    OnlyShowPreviewPage ,
    OnlyShowChatThemePage ,
    OnlyShowWallPaperPage ,
    OnlyShowDisplayThemePage ,
} = setSlice.actions;

export default setSlice.reducer;