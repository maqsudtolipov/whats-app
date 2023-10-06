const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');

dotEnv.config({ path: './.env' });

const app = express();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(DB)
  .then(() => console.log('☁️  Database connection successful!'));

app.use('/api/users', userRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
});
