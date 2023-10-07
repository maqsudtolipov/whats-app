const catchAsync = require('../utils/catchAsync');
const Conversation = require('../models/conversationModel');

exports.createConversation = catchAsync(async (req, res) => {
  const conversation = await Conversation.create({
    users: req.body.users,
  });

  res.status(200).json({
    status: 'success',
    data: conversation,
  });
});
