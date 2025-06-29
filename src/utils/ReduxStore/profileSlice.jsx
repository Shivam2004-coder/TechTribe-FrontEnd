// src/redux/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  emailId: '',
  gender: '',
  dateOfBirth: '',
  promptContent: [], // [{ index: 0, content: "..." }]
  uploadedImages: [], // [url1, url2, ...]
  profileImage: '', // URL string or base64
  bio: '',
  jobTitle: '',
  companyName: '',
  school: '',
  livingIn: '',
  skills: [], // ['JavaScript', 'React', ...]
  socialLinks: {
    github: '',
    linkedin: '',
    portfolio: '',
  },
  membershipType: '',
  swipes: '',
  chatThemeImage: '',
  wallpaperImage: '',
  displayMode: '',

  // ✅ Add this
  isLoaded: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserId: (state , action) => { state.userId = action.payload; },
    setFirstName: (state, action) => { state.firstName = action.payload; },
    setLastName: (state, action) => { state.lastName = action.payload; },
    setEmailId: (state, action) => { state.emailId = action.payload; },
    setGender: (state, action) => { state.gender = action.payload; },
    setDateOfBirth: (state, action) => { state.dateOfBirth = action.payload; },
    setPromptUserContent: (state, action) => {
      if (Array.isArray(action.payload)) {
        // Replace the whole promptContent
        state.promptContent = action.payload;
      } else {
        // Update or add an entry by index
        const { index, content } = action.payload;
        const existingIndex = state.promptContent.findIndex(p => p.index === index);
        if (existingIndex !== -1) {
          state.promptContent[existingIndex].content = content;
        } else {
          state.promptContent.push({ index, content });
        }
      }
    },
    // setPromptUserContent: (state, action) => { state.promptContent = action.payload; },
    // updatePromptContentAtIndex: (state, action) => {
    //   const { index, content } = action.payload;
    //   const existingIndex = state.promptContent.findIndex(p => p.index === index);
    //   if (existingIndex !== -1) {
    //     state.promptContent[existingIndex].content = content;
    //   } else {
    //     state.promptContent.push({ index, content });
    //   }
    // },
    removePromptByIndex: (state, action) => {
      const indexToRemove = action.payload;
      state.promptContent = state.promptContent.filter(p => p.index !== indexToRemove);
    },

    setUploadedImages: (state, action) => { state.uploadedImages = action.payload; },
    addUploadedImage: (state, action) => { state.uploadedImages.push(action.payload); },
    removeUploadedImage: (state, action) => {
      state.uploadedImages = state.uploadedImages.filter(url => url !== action.payload);
    },

    setProfileImage: (state, action) => { state.profileImage = action.payload; },
    setBio: (state, action) => { state.bio = action.payload; },
    setJobTitle: (state, action) => { state.jobTitle = action.payload; },
    setCompanyName: (state, action) => { state.companyName = action.payload; },
    setSchool: (state, action) => { state.school = action.payload; },
    setLivingIn: (state, action) => { state.livingIn = action.payload; },

    setSkills: (state, action) => { state.skills = action.payload; },
    addSkill: (state, action) => { state.skills.push(action.payload); },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill !== action.payload);
    },
    setGithubLink: (state, action) => {
      state.socialLinks.github = action.payload;
    },
    setLinkedinLink: (state, action) => {
      state.socialLinks.linkedin = action.payload;
    },
    setPortfolioLink: (state, action) => {
      state.socialLinks.portfolio = action.payload;
    },    
    setMembershipType: (state , action) => { state.membershipType = action.payload },
    setSwipes: (state , action) => { state.swipes = action.payload },
    setChatThemeImage: (state , action) => { state.chatThemeImage = action.payload } ,
    setWallpaperImage: (state , action) => { state.wallpaperImage = action.payload },
    setDisplayMode: (state , action) => { state.displayMode = action.payload },
    setProfileLoaded: (state, action) => { state.isLoaded = action.payload } ,
    resetProfile: () => initialState
  }
});

export const {
  setUserId,
  setFirstName,
  setLastName,
  setEmailId,
  setGender,
  setDateOfBirth,
  setPromptUserContent,
  // updatePromptContentAtIndex,
  removePromptByIndex,
  setUploadedImages,
  addUploadedImage,
  removeUploadedImage,
  setProfileImage,
  setBio,
  setJobTitle,
  setCompanyName,
  setSchool,
  setLivingIn,
  setSkills,
  addSkill,
  removeSkill,
  setGithubLink,
  setLinkedinLink,
  setPortfolioLink,
  setMembershipType,
  setSwipes,
  setChatThemeImage,
  setWallpaperImage,
  setDisplayMode ,
  resetProfile ,
  setProfileLoaded ,
} = profileSlice.actions;

export default profileSlice.reducer;
