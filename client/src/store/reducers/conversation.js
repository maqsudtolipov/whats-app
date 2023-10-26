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
      state.messagesByDate = action.payload.messagesByDate;
    },
    newMessage: (state, action) => {
      const message = action.payload;
      const date = new Date(message.createdAt).toDateString();

      if (!state.messagesByDate[date]) state.messagesByDate[date] = [];

      state.messagesByDate[date].push(message);
    },
  },
});

export const { joinConversation, newMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
