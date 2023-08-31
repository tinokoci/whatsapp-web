import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatSearchState, User } from "@/utils/types";

const initialState: ChatSearchState = {
  activeEntityId: "",
  users: [],
};

const chatSearchSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveEntityId: (state, action: PayloadAction<string>) => {
      state.activeEntityId = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const chatReducer = chatSearchSlice.reducer;

export const { setActiveEntityId, setUsers } = chatSearchSlice.actions;
