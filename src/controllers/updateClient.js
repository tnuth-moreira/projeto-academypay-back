const knex = require("../database/config");
const { searchForClient } = require("../database/ClientQuery");

const updateClient = async (req, res) => {
  const { id } = req.user;
  const { nome, email, cpf, telefone, senha } = req.body;

  try {
    const existingClient = await searchForClient({ id });

    if (!existingClient) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    if (cpf) {
      const cpfExists = await knex("clientes")
        .where("cpf", cpf)
        .whereNot("id", id)
        .first();

      if (cpfExists) {
        return res.status(409).json({ mensagem: "CPF já cadastrado!" });
      }
    }

    const emailExists = await knex("clientes")
      .where("email", email)
      .whereNot("id", id)
      .first();
    if (emailExists) {
      return res.status(409).json({ mensagem: "E-mail já cadastrado!" });
    }

    const { senha: _, ...userData } = req.body;

    await knex("clientes")
      .where({ id })
      .update({ ...userData });

    return res.status(203).json({
      mensagem: "Atualizado com sucesso",
      usuario: { id, nome, cpf, telefone, email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ erro: "Erro ao atualizar o cliente" });
  }
};

module.exports = updateClient;