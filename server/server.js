const mongoose = require('mongoose');
const { Server } = require('socket.io');
const dotEnv = require('dotenv');

dotEnv.config({ path: './.env' });

const app = require('./app');
const Conversation = require('./models/conversationModel');
const DirectMessage = require('./models/directMessageModel');
const User = require('./models/userModel');
const { findSticker } = require('./utils/stickerFinder');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(DB)
  .then(() => console.log('☁️  Database connection successful!'));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
});

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://whats-app-maqsud.vercel.app'],
  },
});

let onlineUsers = [];

io.on('connection', (device) => {
  console.log('🐳 joined:', device.id);

  device.on('join', async (data) => {
    await User.findByIdAndUpdate(data, {
      lastSeen: Date.now(),
    });

    onlineUsers.push({
      userId: data,
      socketId: device.id,
    });

    io.emit('updateOnlineUsers', onlineUsers);
  });

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

    const messagesByDate = {};
    messages.forEach((message) => {
      const date = message.createdAt.toDateString();
      if (!messagesByDate[date]) messagesByDate[date] = [];
      messagesByDate[date].push(message);
    });

    // Fully works after connected to server, on postman not working
    cb({
      conversation,
      partner,
      messagesByDate,
    });
  });

  device.on('newMsgToConvo', async ({ content, userId, convoId }) => {
    let isSticker;
    let stickerUrl;
    let msgContent = content;

    if (content.startsWith(':')) {
      const URL = findSticker(content);
      const serverURL = 'http://localhost:8000';

      isSticker = true;
      stickerUrl = `${serverURL}/${URL}`;
      msgContent = 'Sticker';
    }

    const dm = await DirectMessage.create({
      content: msgContent,
      conversation: convoId,
      sender: userId,
      isSticker,
      stickerUrl,
    });

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

  device.on('disconnect', () => {
    console.log('🍓 left:', device.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== device.id);

    io.emit('updateOnlineUsers', onlineUsers);
  });
});
