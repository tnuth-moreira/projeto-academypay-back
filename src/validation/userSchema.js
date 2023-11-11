const joi = require("joi");

const userSchema = joi.object({
  nome: joi.string().trim().required().messages({
    "any.required": "Todos os campos são obrigatorios",
    "string.empty": "Todos os campos são obrigatorios",
    "string.trim": "Insira um nome valido",
    "string.base": "Insira um nome valido",
  }),

  email: joi.string().email().required().messages({
    "any.required": "Todos os campos são obrigatorios",
    "string.empty": "Todos os campos são obrigatorios",
    "string.email": "Digite um email valido",
  }),

  senha: joi
    .string()
    .min(8)
    .required()
    .pattern(/[^a-zA-Z0-9\d\w]/)
    .messages({
      "any.required": "Todos os campos são obrigatorios",
      "string.empty": "Todos os campos são obrigatorios",
      "string.min": "A senha precisa conter, no mínimo, 8 caracteres",
      "string.base": "Insira uma senha valida",
      "string.pattern.base":
        "A senha deve conter numeros e caracteres especiais",
    }),
});

module.exports = userSchema;
