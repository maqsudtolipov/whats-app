import { createSlice } from '@reduxjs/toolkit';

/**
 * @constructor
 * @type {{connected: boolean}}
 */
const DEMO_SOCKET = {
  connected: true,
  socketId: '89g7f9e8r7g98er7g',
  onlineUsers: [],
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    connected: false,
    socketId: null,
    onlineUsers: [],
  },
  reducers: {
    connectSocket: (state, action) => {
      state.connected = true;
      state.socketId = action.payload;
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { connectSocket, updateOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;
