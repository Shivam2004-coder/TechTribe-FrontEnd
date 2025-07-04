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
        showDeleteAccountPage : false,

        showProfileMenu : false,
        showSettingsMenu : false,

        showMenu : false,
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
            state.showDeleteAccountPage = false;
        },
        OnlyShowWallPaperPage: (state) => {
            state.showChatThemePage = false;
            state.showWallPaperPage = true;
            state.showDisplayThemePage = false;
            state.showDeleteAccountPage = false;
        },
        OnlyShowDisplayThemePage: (state) => {
            state.showChatThemePage = false;
            state.showWallPaperPage = false;
            state.showDisplayThemePage = true;
            state.showDeleteAccountPage = false;
        },
        OnlyShowDeleteAccountPage: (state) => {
            state.showChatThemePage = false;
            state.showWallPaperPage = false;
            state.showDisplayThemePage = false;
            state.showDeleteAccountPage = true;
        },
        toggleProfileMenu: (state , action ) => {
            state.showProfileMenu = action.payload;
            state.showSettingsMenu = false;
            state.showMenu = false;
        },
        toggleSettingsMenu: (state , action ) => {
            state.showProfileMenu = false;
            state.showSettingsMenu = action.payload;
            state.showMenu = false;
        },
        toggleMenu: (state , action ) => {
            state.showProfileMenu = false;
            state.showSettingsMenu = false;
            state.showMenu = action.payload
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
    OnlyShowDeleteAccountPage,
    
    toggleProfileMenu,
    toggleSettingsMenu,
    toggleMenu,

} = setSlice.actions;

export default setSlice.reducer;