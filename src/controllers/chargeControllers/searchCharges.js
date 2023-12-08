const knex = require("../../database/config");
const { validate } = require("uuid");

async function searchCharges(req, res) {
  const { id } = req.user;
  const { searchTerm } = req.query;

  try {
    const charges = await knex("cobrancas")
      .select(
        "clientes.nome as cliente_nome",
        "clientes.id",
        "cobrancas.id_cob",
        "cobrancas.valor",
        "cobrancas.data_venc",
        "cobrancas.status",
        "cobrancas.descricao"
      )
      .join("clientes", "cobrancas.cliente_id", "clientes.id")
      .where((builder) => {
        if (validate(searchTerm)) {
          builder.orWhere("cobrancas.id_cob", searchTerm);
        } else {
          builder.where("clientes.nome", "ilike", `%${searchTerm}%`);
        }
      })
      .andWhere("clientes.usuario_id", id);

    if (charges.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma cobrança cadastrada" });
    }

    return res.status(200).json(charges);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Algo inesperado aconteceu ao realizar a busca",
      erro: error.message,
    });
  }
}

module.exports = searchCharges;
