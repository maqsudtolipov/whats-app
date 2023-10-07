const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

const Conversation = mongoose.model('User', conversationSchema);

module.exports = Conversation;
