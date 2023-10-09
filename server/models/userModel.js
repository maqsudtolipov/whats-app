const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, 'Your password must be at least 6 characters'],
      required: [true, 'Please enter your password'],
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

const User = mongoose.model('User', userSchema);

module.exports = User;
