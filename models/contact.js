const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'missing required name field' }),
  email: Joi.string().pattern(emailRegExp).messages({ 'string.pattern.base': 'wrong email format!' }),
  phone: Joi.string().required().messages({ 'any.required': 'missing required phone field' }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({ 'any.required': 'missing required favorite field' }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
