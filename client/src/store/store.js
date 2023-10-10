import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.js';
import wireReducer from './reducers/wire.js';

export default configureStore({
  reducer: {
    user: userReducer,
    wire: wireReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
