const mongoose = require('mongoose');

const directMessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Message cannot be empty'],
  },
  conversation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Conversation',
    required: [true, 'Please select a conversation'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const DirectMessage = mongoose.model('DirectMessage', directMessageSchema);
module.exports = DirectMessage;
