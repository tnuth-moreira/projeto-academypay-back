const knex = require("../database/config");

const updateCharge = async (req, res) => {
  const { id_cob, data_venc, valor, status, descricao } = req.body;

  try {
    const locateChargebyID = await knex("cobrancas").where({ id_cob }).first();

    if (!locateChargebyID) {
      return res.status(400).json({ mensagem: "Cobrança não encontrada" });
    }

    if (!["Pendente", "Paga", "Vencida"].includes(status)) {
      return res.status(400).json({ mensagem: "Status de cobrança inválido" });
    }

    const updatedCharge = await knex("cobrancas")
      .where({ id_cob })
      .update({
        descricao,
        data_venc,
        valor,
        status,
      })
      .returning("*");

    return res.status(200).json({
      mensagem: "Cobrança atualizada com sucesso",
      cobranca: updatedCharge,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: error.message });
  }
};

module.exports = updateCharge;
