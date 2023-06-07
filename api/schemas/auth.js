const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(3).required('Vui lòng không được bỏ trống'),
  email: Joi.string().email().required('Vui lòng không được bỏ trống'),
  password: Joi.string().min(6).required('Vui lòng không được bỏ trống'),
  confirmPassword: Joi.string().min(6).valid(Joi.ref('password')).required('Vui lòng không được bỏ trống'),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required('Vui lòng không được bỏ trống'),
  password: Joi.string().min(6).required('Vui lòng không được bỏ trống'),
});

module.exports = { signupSchema, signinSchema };
