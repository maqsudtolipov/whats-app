const catchAsync = require('../utils/catchAsync');
const DirectMessage = require('../models/directMessageModel');
const { findSticker } = require('../utils/stickerFinder');

exports.sendDM = catchAsync(async (req, res) => {
  // Check if received message is sticker
  console.log(req.body);
  if (req.body.content.startsWith(':')) {
    const stickerUrl = findSticker(req.body.content);
    const url = 'http://localhost:8000';

    req.body.isSticker = true;
    req.body.stickerUrl = `${url}/${stickerUrl}`;
  }

  const dm = await DirectMessage.create({
    content: req.body.content,
    conversation: req.params.id,
    sender: req.user.id,
    isSticker: req.body.isSticker,
    stickerUrl: req.body.stickerUrl,
  });

  res.status(200).json({
    status: 'success',
    data: dm,
  });
});
