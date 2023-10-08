const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
      // Not sure if this is a good idea
      unique: [true, 'This conversation already exists'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
