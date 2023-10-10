import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.js';
import conversationReducer from './reducers/conversation.js';
import socketReducer from './reducers/socket.js';

export default configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
