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
