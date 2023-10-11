const catchAsync = require('../utils/catchAsync');
const Conversation = require('../models/conversationModel');
const DirectMessage = require('../models/directMessageModel');
const User = require('../models/userModel');

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
  const slug = req.body.users.sort().join('-');
  const conversation = await Conversation.create({
    slug,
    users: req.body.users,
  });
  const user1 = await User.findByIdAndUpdate(req.body.users[0], {
    $addToSet: { conversations: conversation.id },
  });
  const user2 = await User.findByIdAndUpdate(req.body.users[1], {
    $addToSet: { conversations: conversation.id },
  });

  res.status(200).json({
    status: 'success',
    message: 'Conversation created successfully',
    data: conversation,
  });
});
