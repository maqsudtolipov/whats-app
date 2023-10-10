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

export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async () => {
  try {
    const res = await axios.get('/users/isLoggedIn');

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
});
