import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatSearchState, DirectChat, GroupChat } from "@/utils/types";

const initialState: ChatSearchState = {
  openedChatId: "",
  openedChatUserId: null,
  userChatPreviews: [],
  userGroupPreviews: [],
  searchChatPreviews: [],
};

const chatSearchSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserChatPreviews: (state, action: PayloadAction<DirectChat[]>) => {
      state.userChatPreviews = action.payload;
    },
    setUserGroupPreviews: (state, action: PayloadAction<GroupChat[]>) => {
      state.userGroupPreviews = action.payload;
    },
    setSearchChatPreviews: (state, action: PayloadAction<DirectChat[]>) => {
      state.searchChatPreviews = action.payload;
    },
  },
});

export const chatReducer = chatSearchSlice.reducer;

export const {
  setUserChatPreviews,
  setUserGroupPreviews,
  setSearchChatPreviews,
} = chatSearchSlice.actions;
