const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().min(3).max(50).required(),

  email: joi.string().email().required(),

  password: joi.string().min(6).required(),

  role: joi.string().valid("USER", "ADMIN", "SUPER_ADMIN").optional(),

  timezone: joi.string().optional(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
