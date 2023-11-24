const knex = require("../database/config");

const addCharge = async (req, res) => {
  const { cliente_id, data_venc, valor, status, descricao } = req.body;

  try {
    const locateClientbyID = await knex("clientes")
      .where({ id: cliente_id })
      .first();

    if (!locateClientbyID) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }

    if (!["Pendente", "Paga", "Vencida"].includes(status)) {
      return res.status(400).json({ mensagem: "Status de cobrança inválido" });
    }

    const newCharge = await knex("cobrancas").insert(req.body).returning("*");

    if (!newCharge) {
      return res.status(400).json({ mensagem: "Cobrança não cadastrada" });
    }

    return res.status(201).json({
      mensagem: "Cobrança cadastrada com sucesso",
      cobranca: newCharge,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: error.message });
  }
};

module.exports = addCharge;
