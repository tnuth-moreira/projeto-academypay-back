const knex = require("../../database/config");

async function dashboardClients(req, res) {
  const { id } = req.user;

  try {
    const clientsUpToDate = await knex("clientes")
      .where({ usuario_id: id, status: "Em dia" })
      .returning("*");

    const defaultingClients = await knex("clientes")
      .where({
        usuario_id: id,
        status: "Inadimplente",
      })
      .returning("*");

    res.status(200).json({ clientsUpToDate, defaultingClients });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao tentar consultar os clientes",
      erro: error.message,
    });
  }
}

module.exports = dashboardClients;
