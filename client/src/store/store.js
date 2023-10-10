import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.js';
import conversationController from './reducers/conversation.js';

export default configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationController,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
