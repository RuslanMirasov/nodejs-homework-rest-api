const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'missing required name field' }),
  email: Joi.string().pattern(emailRegExp).messages({ 'any.required': 'wrong email format' }),
  password: Joi.string().min(6).required().messages({ 'any.required': 'missing required password field' }),
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
