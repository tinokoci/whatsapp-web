import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatSearchState, DirectChat } from "@/utils/types";

const initialState: ChatSearchState = {
  openedChatId: "",
  openedChatUserId: null,
  userChatPreviews: [],
  searchChatPreviews: [],
};

const chatSearchSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserChatPreviews: (state, action: PayloadAction<DirectChat[]>) => {
      state.userChatPreviews = action.payload;
    },
    setSearchChatPreviews: (state, action: PayloadAction<DirectChat[]>) => {
      state.searchChatPreviews = action.payload;
    },
  },
});

export const chatReducer = chatSearchSlice.reducer;

export const { setUserChatPreviews, setSearchChatPreviews } =
  chatSearchSlice.actions;
