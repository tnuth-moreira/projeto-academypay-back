const knex = require("../database/config");

async function deleteCharge(req, res) {
  const { idCharge } = req.params;

  try {
    const charge = await knex("cobrancas").where({ id_cob: idCharge }).first();

    if (!charge) {
      return res.status(404).json({ mensagem: "A cobrança não existe" });
    }

    // if (charge.status === "Vencida") {
    //   return res
    //     .status(400)
    //     .json({ mensagem: "Você não pode deletar uma cobrança vencida" });
    // }

    await knex("cobrancas").where({ id_cob: idCharge }).del();

    return res.status(200).json({ mensagem: "Cobrança deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = deleteCharge;
