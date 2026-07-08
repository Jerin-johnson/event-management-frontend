import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./slice/UserProfileSlice";

export const store = configureStore({
  reducer: {
    profile: userProfileReducer,
  },
});
