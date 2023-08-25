import { configureStore } from "@reduxjs/toolkit";
import testReducer from "@/redux/reducers/test";

export const store = configureStore({
  reducer: testReducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
