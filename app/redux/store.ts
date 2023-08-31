import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/reducers/auth";
import { chatReducer } from "@/redux/reducers/chat";

export const store = configureStore({
  reducer: {
    authReducer,
    chatReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
