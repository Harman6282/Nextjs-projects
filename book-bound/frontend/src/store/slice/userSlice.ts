import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

interface UserState {
  user: any | null;
  isEmailVerified: boolean;
  isLoginDialogOpen: boolean;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isEmailVerified: false,
  isLoginDialogOpen: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setEmailVerified: (state, action: PayloadAction<any>) => {
      state.isEmailVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isEmailVerified = false;
      state.isLoggedIn = false;
    },
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
    authStatus: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const {
  setUser,
  setEmailVerified,
  logout,
  toggleLoginDialog,
  authStatus,
} = userSlice.actions;
export default userSlice.reducer;
