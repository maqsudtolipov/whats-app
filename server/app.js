const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/userModel');

dotEnv.config({ path: './.env' });

const app = express();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(DB)
  .then(() => console.log('☁️  Database connection successful!'));

app.get('', async (req, res) => {
  const user = await User.create({
    name: 'maqsud',
    email: 'maqsud@example.com',
  });

  res.json({
    success: 'success',
    message: 'Hello there',
    user,
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
});
