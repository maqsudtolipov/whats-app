// This reducer for socket.io but we have variable called socket
import { createSlice } from '@reduxjs/toolkit';

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    connected: false,
  },
  reducers: {
    joinConversation: (state, action) => {
      state.chat = true;
      state.data = action.payload.conversation;
      state.partner = action.payload.partner;
      state.messages = action.payload.messages;
    },
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { joinConversation, newMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
