const joi = require('joi')

const schemaClient = joi.object({
    username: joi.string().required().messages({
        'string.empty': 'O campo Nome é obrigatório'
    }),
    email: joi.string().email().required().messages({
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'Formato de email inválido'
    }),
    cpf: joi.string().required().messages({
        'string.empty': 'O campo CPF é obrigatório'
    }),
    phone: joi.string().required().messages({
        'string.empty': 'O campo Telefone é obrigatório'
    }),
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
})


module.exports = schemaClient