const express = require('express');
// const Joi = require('joi');

// const contacts = require('../../models/contacts');

// const { HttpError } = require('../../helpers');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required().messages({ 'any.required': 'missing required name field' }),
//   email: Joi.string().required().messages({ 'any.required': 'missing required email field' }),
//   phone: Joi.string().required().messages({ 'any.required': 'missing required phone field' }),
// });

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', ctrl.updateById);

module.exports = router;
