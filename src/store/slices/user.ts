import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface User {
  id: string;
  login: string;
}

export interface UserState {
  profile: User | null;
}

const initialState: UserState = {
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    removeProfile: (state) => {
      state.profile = null;
    },
  },
});

export const selectProfile = (state: RootState) => state.user.profile;

export const { removeProfile, setProfile } = userSlice.actions;

export default userSlice.reducer;
