import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "@/utils/types";

const initialState: AuthState = {
  user: null,
  firstPageRender: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    acknowledgeFirstPageRender: (state) => {
      state.firstPageRender = false;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      const user = state.user as User;
      user.username = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      const user = state.user as User;
      user.avatar = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;

export const {
  auth,
  logout,
  acknowledgeFirstPageRender,
  setUsername,
  setAvatar,
} = authSlice.actions;
