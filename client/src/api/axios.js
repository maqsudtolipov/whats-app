import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : 'https://whats-app-ktfi.onrender.com/api',
  withCredentials: true,
});
