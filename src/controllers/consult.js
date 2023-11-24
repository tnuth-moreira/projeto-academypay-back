const { searchForClient } = require("../database/ClientQuery");

const consultClient = async (req, res) => {
  const { id } = req.user;

  try {
    const clients = await searchForClient({ usuario_id: id });

    if (!clients) {
      return res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }

    await knex.raw(`UPDATE clientes
    SET status = CASE
        WHEN EXISTS (SELECT 1 FROM cobrancas WHERE cobrancas.id_cliente = clientes.id_cliente AND cobrancas.status_cobranca = 'Vencida') THEN 'Inadimplente'
        WHEN EXISTS (SELECT 1 FROM cobrancas WHERE cobrancas.id_cliente = clientes.id_cliente AND cobrancas.status_cobranca = 'Pendente') THEN 'Em dia'
        ELSE 'em dia'  -- Defina um padrão para o caso de não haver cobranças
    END;`);

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  consultClient,
};
