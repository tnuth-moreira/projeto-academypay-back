const joi = require("joi");

const schemaClient = joi.object({
  nome: joi.string().trim().strict().required().messages({
    "string.empty": "O campo Nome é obrigatório",
    "string.trim": "Digite um nome valido",
  }),
  email: joi.string().email().trim().strict().required().messages({
    "string.empty": "O campo email é obrigatório",
    "string.email": "Formato de email inválido",
    "string.trim": "Digite um email valido",
  }),
  cpf: joi.string().trim().strict().required().messages({
    "string.empty": "O campo CPF é obrigatório",
    "string.trim": "Digite um cpf valido",
  }),
  telefone: joi.string().required().messages({
    "string.empty": "O campo Telefone é obrigatório",
    "string.trim": "Digite phone valido",
  }),
  cep: "",
  logradouro: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
});

module.exports = schemaClient;
