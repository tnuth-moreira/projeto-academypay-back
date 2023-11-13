const knex = require('../connection')

const validateRegisterClient = joiSchema => async (req, res, next) => {

        const isDuplicateEmail = async (email) => {
            const client = await knex('client').where({ email }).first();
            return !client
        }

        try {
            await joiSchema.validateAsync(req.body)

            const emailDuplicate = await isDuplicateEmail(req.body.email)
           
            if (!emailDuplicate) {
                throw new Error('O email informado já está cadastrado.')
            }

            next()

        } catch (error) {

            return res.status(400).json({ mensagem: error.message })
        }
    }

    module.exports = validateRegisterClient