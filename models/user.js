const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, 'Email is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({ 'any.required': 'missing required password field' }),
  email: Joi.string().pattern(emailRegExp).messages({ 'any.required': 'wrong email format' }),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).messages({ 'any.required': 'wrong email format' }),
  password: Joi.string().min(6).required().messages({ 'any.required': 'missing required password field' }),
});

const schemas = {
  registerSchema,
  loginSchema,
};
const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
