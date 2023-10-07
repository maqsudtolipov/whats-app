const catchAsync = require('../utils/catchAsync');
const DirectMessage = require('../models/directMessageModel');

exports.sendDM = catchAsync(async (req, res) => {
  const conversation = await DirectMessage.create({
    content: req.body.content,
    conversation: req.params.id,
    sender: req.body.sender,
  });

  res.status(200).json({
    status: 'success',
    data: conversation,
  });
});
