const joi = require("joi");

const userSchema = joi.object({
  nome: joi.string().trim().strict().required().messages({
    "any.required": "Todos os campos são obrigatorios",
    "string.empty": "Todos os campos são obrigatorios",
    "string.trim": "Insira um nome valido",
    "string.base": "Insira um nome valido",
  }),

  email: joi.string().email().trim().strict().required().messages({
    "any.required": "Todos os campos são obrigatorios",
    "string.empty": "Todos os campos são obrigatorios",
    "string.email": "Digite um email valido",
    "string.trim": "Insira um email valido",
  }),

  senha: joi
    .string()
    .min(8)
    .trim()
    .strict()
    .required()
    .pattern(/[^a-zA-Z0-9\d\w]/)
    .messages({
      "any.required": "Todos os campos são obrigatorios",
      "string.empty": "Todos os campos são obrigatorios",
      "string.min": "A senha precisa conter, no mínimo, 8 caracteres",
      "string.base": "Insira uma senha valida",
      "string.pattern.base":
        "A senha deve conter numeros e caracteres especiais",
      "string.trim": "Insira uma senha valida",
    }),
});

module.exports = userSchema;
