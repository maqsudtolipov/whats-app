import { createSlice } from '@reduxjs/toolkit';
import { signup, isLoggedIn, login, logOut } from '../thunks/user.js';

/**
 * @constructor
 * @type {{data: {img: string, name: string, bio: string, id: string, email: string}, auth: boolean, conversations: [{latestMessageDate: string, partner: {img: string, name: string, bio: string, id: string, email: string}, latestMessage: string, id: string}]}}
 */
const DEMO_USER = {
  auth: true,
  data: {
    id: 'a1b2c3d4e5f6g7h8',
    name: 'Mozzie',
    email: 'mozzie@example.com',
    img: 'https://dummyimage.com/256/d000ff/ffffff.png',
    bio: '🍀 I am just awesome',
  },
  conversations: [
    {
      id: 'a1b2c3d4e5f6g7',
      partner: {
        id: 'a1b2c3d4e5f6g7h8',
        name: 'Mr Suit',
        email: 'mrsuit@example.com',
        img: 'https://dummyimage.com/256/d000ff/ffffff.png',
        bio: '🍀 I am just awesome',
      },
      latestMessage: 'See you soon',
      latestMessageDate: '2017-09-01T12:34:56',
    },
  ],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
    data: null,
    conversations: null,
  },
  reducers: {
    /**
     * This function adds a new conversation to the conversations list in navbar
     */
    addNewConversationToUser: (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    },
    /**
     * This function updates latest message of user's conversation in navbar
     */
    updateLatestMessage: (state, action) => {
      const id = state.conversations.findIndex(
        (con) => con.id === action.payload.id,
      );
      state.conversations[id].latestMessage = action.payload.latestMessage;
      state.conversations[id].latestMessageDate =
        action.payload.latestMessageDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.auth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.conversations = action.payload.conversations;
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

export const { addNewConversationToUser, updateLatestMessage } =
  userSlice.actions;
export default userSlice.reducer;
