const catchAsync = require('../utils/catchAsync');
const Conversation = require('../models/conversationModel');
const DirectMessage = require('../models/directMessageModel');

exports.getConversation = catchAsync(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  const messages = await DirectMessage.find({
    conversation: conversation.id,
  });

  res.status(200).json({
    status: 'success',
    data: {
      conversation,
      messages,
    },
  });
});

exports.createConversation = catchAsync(async (req, res) => {
  const conversation = await Conversation.create({
    users: req.body.users,
  });

  res.status(200).json({
    status: 'success',
    message: 'Conversation created successfully',
    data: conversation,
  });
});
