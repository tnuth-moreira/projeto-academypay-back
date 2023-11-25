const knex = require("../database/config");

async function clientDetails(req, res) {
  const { clientId } = req.params;

  try {
    const client = await knex("clientes")
      .select(
        "nome",
        "cpf",
        "email",
        "telefone",
        "endereco",
        "complemento",
        "bairro",
        "cidade",
        "uf",
        "status"
      )
      .where("id", clientId)
      .first();

    if (!client) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const charges = await knex("cobrancas")
      .select("id_cob", "descricao", "data_venc", "valor", "status")
      .where("cliente_id", clientId);

    return res.status(200).json({ client, charges });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = clientDetails;