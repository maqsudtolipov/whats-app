const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'You name must be at least 3 characters'],
      maxLength: [24, 'Your name must be at most 24 characters'],
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    img: {
      type: String,
      default: 'localhost:8000/user.png',
    },
    bio: {
      type: String,
      minLength: [3, 'Please use at least 3 characters'],
      default: '🍀 I am just awesome',
    },
    password: {
      type: String,
      minLength: [6, 'Your password must be at least 6 characters'],
      required: [true, 'Please enter your password'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      minLength: [6, 'Your password must be at least 6 characters'],
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (confirm) {
          return confirm === this.password;
        },
        message: 'Password are not the same',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
