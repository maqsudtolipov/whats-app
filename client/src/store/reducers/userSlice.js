import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
  },
});

export default userSlice.reducer;
