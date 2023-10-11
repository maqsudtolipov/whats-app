const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  const query = {};

  if (name) query.name = { $regex: name, $options: 'ix' };

  const users = await User.find(query);

  res.status(200).json({
    status: 'success',
    data: users,
  });
});
