import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfile: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",

  initialState,

  reducers: {
    setCurrentProfile(state, action) {
      console.log("the action", action);
      state.currentProfile = action.payload;
    },
  },
});

export const { setProfiles, setCurrentProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
