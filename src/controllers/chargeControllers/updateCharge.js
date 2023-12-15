const knex = require("../../database/config");
const { isAfter, parseISO } = require("date-fns");

function isDateInPast(date) {
  const currentDate = new Date();
  const dueDate = parseISO(date);
  return isAfter(currentDate, dueDate);
}

function determineNewClientStatus(status, updatedDate) {
  if (
    status === "Paga" ||
    (status === "Pendente" && !isDateInPast(updatedDate))
  ) {
    return "Em Dia";
  } else {
    return "Inadimplente";
  }
}

async function updateCharge(req, res) {
  const { id } = req.user;
  let { cliente_id, id_cob, data_venc, valor, status, descricao } = req.body;

  try {
    const existingClient = await knex("clientes")
      .where({ id: cliente_id, usuario_id: id })
      .first();

    if (!existingClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const locateChargebyID = await knex("cobrancas")
      .where({ id_cob, cliente_id })
      .first();

    if (!locateChargebyID) {
      return res.status(400).json({ mensagem: "Cobrança não encontrada" });
    }

    if (!["Pendente", "Paga", "Vencida"].includes(status)) {
      return res.status(400).json({ mensagem: "Status de cobrança inválido" });
    }

    const newClientStatus = determineNewClientStatus(status, data_venc);

    await knex("clientes")
      .where({ id: cliente_id })
      .update({ status: newClientStatus });

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
      cobranca: updatedCharge[0],
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Algo inesperado aconteceu ao atualizar as informações",
      erro: error.message,
    });
  }
}

module.exports = updateCharge;
