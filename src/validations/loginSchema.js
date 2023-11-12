const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().trim().strict().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    "string.email": "Por favor informe um email válido",
    "string.trim": "Por favor informe um email válido",
  }),

  senha: joi.string().min(8).trim().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "Por favor informe a senha (mínimo de 8 caracteres)",
    "string.trim": "Por favor insira uma senha válida",
  }),
});

module.exports = loginSchema;
