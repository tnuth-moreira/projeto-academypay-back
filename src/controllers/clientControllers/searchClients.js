const knex = require("../../database/config");

async function searchClients(req, res) {
  const { id } = req.user;
  const { searchTerm, orderBy } = req.query;

  try {
    let clientsQuery = knex("clientes")
      .select("id", "nome", "cpf", "email")
      .where((builder) => {
        builder.where("nome", "ilike", `%${searchTerm}%`)
          .orWhere("cpf", "ilike", `%${searchTerm}%`)
          .orWhere("email", "ilike", `%${searchTerm}%`);
      })
      .andWhere("usuario_id", id);

      
    if (orderBy === "nome") {
      clientsQuery = clientsQuery.orderBy("nome");
    }

    const clients = await clientsQuery;

    if (clients.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Algo inesperado aconteceu ao realizar a busca",
      erro: error.message,
    });
  }
}

module.exports = searchClients;
