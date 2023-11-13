const knex = require('../connection')

const deleteClient = async (req, res) => {
    const { userName } = req.body

    try {
        const clientData = await knex('client').where({ username: userName })

        if (clientData.length < 1) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.'})
        }

        await knex('client').del().where('username', userName)

        return res.status(200).json({ mensagem: 'Cliente deletado com sucesso' })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }
}

module.exports = {
    deleteClient
}