const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const { populate } = require('dotenv');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

const createSendToken = (id, data, statusCode, req, res) => {
  const token = signToken(id);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    withCredentials: true,
  };
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(userData);

  createSendToken(user.id, user, 201, req, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 404));
  }

  const user = await User.findOne({ email })
    .select('+password')
    .populate({
      path: 'conversations',
      populate: {
        path: 'users',
      },
    });
  const cons = user.conversations.map((el) => {
    return {
      id: el.id,
      partner: el.users.filter((el) => el.id !== user.id)[0],
    };
  });

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user.id, { data: user, conversations: cons }, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (cookie) {
    // Verify token
    const decoded = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError('User no longer exists', 401));

    // Check if user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat))
      return next(
        new AppError(
          'User recently changed password. Please log in again',
          401,
        ),
      );

    //-- GRAND ACCESS --
    req.user = user;
    next();
  } else {
    return next(new AppError('Please log in first', 401));
  }
});

// THIS IS FOR AUTO LOG IN USER IF BROWSER HAS COOKIE
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'conversations',
    populate: {
      path: 'users',
    },
  });
  const cons = user.conversations.map((el) => {
    return {
      id: el.id,
      partner: el.users.filter((el) => el.id !== user.id)[0],
    };
  });

  res.status(200).json({
    status: 'success',
    data: req.user,
    conversations: cons,
  });
});

exports.logOut = (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'See you soon!',
  });
};
