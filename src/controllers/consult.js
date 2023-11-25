const { searchForClient } = require("../database/ClientQuery");
const knex = require("../database/config");

const consultClient = async (req, res) => {
  const { id } = req.user;

  try {
    const clients = await searchForClient({ usuario_id: id });

    if (!clients) {
      return res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }

    await knex.raw(`UPDATE clientes
    SET status = CASE
        WHEN EXISTS (SELECT 1 FROM cobrancas WHERE cobrancas.cliente_id = clientes.id
          AND cobrancas.status = 'Vencida') THEN 'Inadimplente'
        WHEN EXISTS (SELECT 1 FROM cobrancas WHERE cobrancas.cliente_id = clientes.id 
          AND cobrancas.status = 'Pendente') THEN 'Em dia'
        ELSE 'Em dia'
    END;`);

    return res.status(200).json(clients);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  consultClient,
};
