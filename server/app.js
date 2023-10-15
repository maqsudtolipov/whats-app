const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const AppError = require('./utils/appError');
const Conversation = require('./models/conversationModel');
const DirectMessage = require('./models/directMessageModel');

const errorController = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const directMessageRouter = require('./routes/directMessageRoutes');

dotEnv.config({ path: './.env' });

const app = express();

// Middlewares
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://whats-app-maqsud.vercel.app'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(DB)
  .then(() => console.log('☁️  Database connection successful!'));

app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/directMessage', directMessageRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Couldn't connect to ${req.originalUrl}`, 404)),
);
app.use(errorController);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
});

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://whats-app-maqsud.vercel.app'],
  },
});

io.on('connection', (device) => {
  console.log(device.id);

  device.on('joinConversation', async ({ cId, userId }, cb) => {
    // Conversation
    const conversation = await Conversation.findById(cId).populate('users');
    // Message history
    const messages = await DirectMessage.find({
      conversation: conversation.id,
    });
    // Conversation partner, not current user
    const partner = conversation.users.filter((user) => user.id !== userId)[0];

    device.join(conversation.id);

    // Fully works after connected to server, on postman not working
    cb({
      conversation,
      messages,
      partner,
    });
  });

  device.on('newMsgToConvo', async ({ content, userId, convoId }, cb) => {
    const dm = await DirectMessage.create({
      content,
      conversation: convoId,
      sender: userId,
    });
    // const cons = user.conversations.map((el) => {
    //   return {
    //     id: el.id,
    //     partner: el.users.filter((el) => el.id !== user.id)[0],
    //   };
    // });
    const con = await Conversation.findByIdAndUpdate(
      convoId,
      {
        latestMessage: dm.content,
        latestMessageDate: Date.now(),
      },
      {
        new: true,
      },
    );

    io.to(convoId).emit('msgToRoom', dm, con);
  });
});
