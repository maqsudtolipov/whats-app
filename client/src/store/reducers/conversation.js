// This reducer for socket.io but we have variable called socket
import { createSlice } from '@reduxjs/toolkit';

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    connected: false,
  },
  reducers: {
    joinConversation: (state, action) => {
      console.log(action.payload);
      state.chat = true;
      state.data = action.payload.conversation;
      state.partner = action.payload.partner;
      state.messages = action.payload.messages;
    },
  },
});

export const { joinConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
