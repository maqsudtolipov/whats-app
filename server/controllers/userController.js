const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => {
  const { name } = req.query;
  const query = {};

  if (name) query.name = { $regex: name, $options: 'ix' };

  const users = await User.find(query);

  res.status(200).json({
    status: 'success',
    data: users,
  });
});

exports.updateMe = async (req, res) => {
  const content = {};

  if (req.body.name) {
    content.name = req.body.name;
  }

  if (req.body.bio) {
    content.bio = req.body.bio;
  }

  const user = await User.findByIdAndUpdate(req.user.id, content, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: user,
  });
};
