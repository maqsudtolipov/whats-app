const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const Conversation = require('./models/conversationModel');
const DirectMessage = require('./models/directMessageModel');

const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const directMessageRouter = require('./routes/directMessageRoutes');
const { raw } = require('express');

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

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
});

// Socket.IO
const io = new Server(server);

io.on('connection', (device) => {
  console.log(device.id);

  device.on('joinConversation', async (data, cb) => {
    const conversation = await Conversation.findById(data.id);
    const messages = await DirectMessage.find({
      conversation: conversation.id,
    });

    // Fully works after connected to server, on postman not working
    // cb({
    //   conversation: JSON.stringify(conversation),
    //   messages: JSON.stringify(messages),
    // });
  });
});
