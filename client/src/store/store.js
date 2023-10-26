import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.js';
import conversationReducer from './reducers/conversation.js';
import socketReducer from './reducers/socket.js';
import themeReducer from './reducers/theme.js';

export default configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
    socket: socketReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
