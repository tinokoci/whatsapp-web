import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponseData, AuthState } from "@/utils/types";

const initialState: AuthState = {
  jwt: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<AuthResponseData>) => {
      state.jwt = action.payload.jwt;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.jwt = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { auth, logout } = authSlice.actions;
