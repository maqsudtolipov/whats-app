import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    connected: false,
  },
  reducers: {
    connectSocket: (state, action) => {
      state.connected = true;
    },
  },
});

export const { connectSocket } = socketSlice.actions;
export default socketSlice.reducer;
