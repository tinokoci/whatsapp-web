import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/reducers/auth";
import testReducer from "@/redux/reducers/test";

export const store = configureStore({
  reducer: {
    authReducer,
    testReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
