// This reducer for socket.io but we have variable called socket
import { createSlice } from '@reduxjs/toolkit';

export const wireSlice = createSlice({
  name: 'wire',
  initialState: {
    connected: false,
    conversation: null,
    chat: null,
  },
  reducers: {
    joinConversation: (state, action) => {
      console.log(action.payload);
      state.chat = true;
      state.conversation = action.payload;
    },
  },
});

export const { joinConversation } = wireSlice.actions;
export default wireSlice.reducer;
