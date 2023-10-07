const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const directMessageRouter = require('./routes/directMessageRoutes');

dotEnv.config({ path: './.env' });

const app = express();

// Middlewares
app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(DB)
  .then(() => console.log('☁️  Database connection successful!'));

app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/directMessage', directMessageRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
});
