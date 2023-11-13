const knex = require('../connection')

const registerClient = async (req, res) => {
    const clientRegister = {
        username,
        email,
        cpf,
        phone,
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        estado
    } = req.body
    
    try {
        const newClient = await knex('client').insert({
            username,
            email,
            cpf,
            phone,
            cep,
            logradouro,
            complemento,
            bairro,
            cidade,
            estado
        })

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' })

    } catch (error) {
        console.error('Erro durante o cliente do usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor', erro: error.message })
    }
}

module.exports = {
    registerClient
}