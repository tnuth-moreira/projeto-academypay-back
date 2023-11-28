const knex = require("../../database/config");

async function allCharges(req, res) {
  const { clientId } = req.params;
  try {
    await knex.raw(`UPDATE cobrancas
    SET status = CASE
        WHEN cobrancas.status = 'Paga' THEN 'Paga'
        WHEN cobrancas.status != 'Paga' AND CURRENT_DATE > cobrancas.data_venc THEN 'Vencida'
        WHEN CURRENT_DATE = cobrancas.data_venc THEN 'Pendente'
        ELSE cobrancas.status
    END;
    `);

    const charges = await knex
      .select(
        "clientes.nome",
        "cobrancas.id_cob",
        "cobrancas.valor",
        "cobrancas.data_venc",
        "cobrancas.status",
        "cobrancas.descricao"
      )
      .from("cobrancas")
      .rightJoin("clientes", "clientes.id", "cobrancas.cliente_id")
      .where("clientes.id", clientId);

    res.status(200).json(charges);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
}

module.exports = allCharges;
