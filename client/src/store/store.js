import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.js';

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
