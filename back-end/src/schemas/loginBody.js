const joi = require('joi');

const schemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = schemaLogin;