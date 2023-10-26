import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    color: 'purple',
    dark: 1,
  },
  reducers: {
    toggleDark: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { toggleDark } = themeSlice.actions;
export default themeSlice.reducer;
