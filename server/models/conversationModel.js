const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    /*
     * This is for preventing duplicate conversations
     * SLUG = user1Id - user2Id
     * ids are always unique so that slugs will be unique also
     */
    slug: {
      type: String,
      required: true,
      unique: [true, 'This conversation already exists'],
    },
    users: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
      required: true,
      validate: {
        validator: function (users) {
          return users.length === 2;
        },
        message: 'Conversation should be between user1 and user2',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
