const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

exports.signUp = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(userData);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
