import { createSlice } from '@reduxjs/toolkit';
import { signup, isLoggedIn, login, logOut } from '../thunks/user.js';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
    data: null,
    conversations: null,
  },
  reducers: {
    addNewConversationToUser: (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    },
    updateLatestMessage: (state, action) => {
      const id = state.conversations.findIndex(
        (con) => con.id === action.payload.id,
      );
      state.conversations[id].latestMessage = action.payload.latestMessage;
      state.conversations[id].latestMessageDate =
        action.payload.latestMessageDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.auth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.conversations = action.payload.conversations;
        state.auth = true;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.conversations = action.payload.conversations;
        state.auth = true;
      })
      .addCase(isLoggedIn.rejected, (state) => {
        state.auth = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.auth = false;
      });
  },
});

export const { addNewConversationToUser, updateLatestMessage } =
  userSlice.actions;
export default userSlice.reducer;
