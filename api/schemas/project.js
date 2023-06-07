/* eslint-disable linebreak-style */
const Joi = require('joi');

const projectSchema = Joi.object({
  name: Joi.string().min(3).required('Vui lòng không được bỏ trống'),
  url: Joi.string().required('Vui lòng không được bỏ trống'),
  description: Joi.string().min(6).required('Vui lòng không được bỏ trống'),
  category: Joi.string().required('Vui lòng không được bỏ trống'),
});

module.exports = { projectSchema };
