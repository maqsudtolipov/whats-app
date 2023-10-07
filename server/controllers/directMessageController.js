const catchAsync = require('../utils/catchAsync');
const DirectMessage = require('../models/directMessageModel');

exports.sendDM = catchAsync(async (req, res) => {
  console.log(req.params);
  const conversation = await DirectMessage.create({
    content: req.body.content,
    conversation: req.params.id,
  });

  res.status(200).json({
    status: 'success',
    data: conversation,
  });
});
