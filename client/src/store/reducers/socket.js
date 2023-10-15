import { createSlice } from '@reduxjs/toolkit';

/**
 * @constructor
 * @type {{connected: boolean}}
 */
const DEMO_SOCKET = {
  connected: true,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    connected: false,
  },
  reducers: {
    connectSocket: (state) => {
      state.connected = true;
    },
  },
});

export const { connectSocket } = socketSlice.actions;
export default socketSlice.reducer;
