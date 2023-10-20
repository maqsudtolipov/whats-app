import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.js';

export const signup = createAsyncThunk(
  'user/signup',
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const res = await axios.post('/users/signup', {
        name,
        email,
        password,
        passwordConfirm,
      });

      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

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

export const updateMe = createAsyncThunk(
  'user/updateMe',
  async ({ name, bio }) => {
    try {
      await axios.patch('/users/updateMe', {
        name,
        bio,
      });
    } catch (err) {
      console.log(err);
    }
  },
);
