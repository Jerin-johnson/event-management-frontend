import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  currentProfile: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",

  initialState,

  reducers: {
    setProfiles(state, action) {
      state.profiles = action.payload;
    },

    setCurrentProfile(state, action) {
      state.currentProfile = action.payload;
    },
  },
});

export const { setProfiles, setCurrentProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
