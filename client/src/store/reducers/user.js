import { createSlice } from '@reduxjs/toolkit';
import { isLoggedIn, login, logOut } from '../thunks/user.js';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.auth = true;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.auth = true;
      })
      .addCase(isLoggedIn.rejected, (state) => {
        state.user = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.auth = false;
      });
  },
});

export default userSlice.reducer;
