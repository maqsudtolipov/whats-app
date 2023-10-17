const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const directMessageRouter = require('./routes/directMessageRoutes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://whats-app-maqsud.vercel.app'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/directMessage', directMessageRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Couldn't connect to ${req.originalUrl}`, 404)),
);
app.use(errorController);

module.exports = app;
