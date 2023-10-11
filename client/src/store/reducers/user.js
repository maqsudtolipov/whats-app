import { createSlice } from '@reduxjs/toolkit';
import { isLoggedIn, login, logOut } from '../thunks/user.js';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
    data: null,
    conversations: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
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

export default userSlice.reducer;
