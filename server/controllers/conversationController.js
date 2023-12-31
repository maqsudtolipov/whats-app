const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
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

exports.createConversation = catchAsync(async (req, res, next) => {
  const slug = req.body.users.sort().join('-');

  // Prevent creating with user himself
  if (req.body.users[0] === req.body.users[1])
    return next(new AppError(`You can't talk with yourself`, 400));

  // Create conversation
  const conversation = await Conversation.create({
    slug,
    users: req.body.users,
  });

  // Update both users
  const user1 = await User.findByIdAndUpdate(req.body.users[0], {
    $addToSet: { conversations: conversation.id },
  });
  const user2 = await User.findByIdAndUpdate(req.body.users[1], {
    $addToSet: { conversations: conversation.id },
  });

  const user = [user1, user2].find((user) => user.id !== req.user.id);
  console.log(user);

  res.status(200).json({
    status: 'success',
    message: 'Conversation created successfully',
    data: {
      id: conversation.id,
      partner: user,
    },
  });
});
