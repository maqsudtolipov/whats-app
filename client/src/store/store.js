import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice.js';

export default configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
