const knex = require('../connection')

const consultClient = async (req, res) => {
    const { userName } = req.body    

    try {
        const clientData = await knex('client').where({ username: userName })

        if (clientData.length < 1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        return res.status(200).json(clientData)

    } catch (error) {
        console.error('Erro na consulta do Knex:', error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    consultClient
}