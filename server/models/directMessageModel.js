const mongoose = require('mongoose');

const directMessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Message cannot be empty'],
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation',
      required: [true, 'Please select a conversation'],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Are you stupid??'],
    },
    // Stickers
    isSticker: {
      type: Boolean,
      default: false,
    },
    stickerUrl: {
      type: String,
      default: undefined,
    },
    // Default false, if seen this key will be removed
    isSeen: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const DirectMessage = mongoose.model('DirectMessage', directMessageSchema);
module.exports = DirectMessage;
