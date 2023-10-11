import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.js';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
      const res = await axios.post('/users/login', {
        email,
        password,
      });

      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const isLoggedIn = createAsyncThunk(
  'user/isLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/users/isLoggedIn');

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const logOut = createAsyncThunk('user/logOut', async () => {
  try {
    await axios.get('/users/logOut');
  } catch (err) {
    console.log(err);
  }
});
