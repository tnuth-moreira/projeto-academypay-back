const { searchForClient } = require("../database/ClientQuery");

const consultClient = async (req, res) => {
  const { id } = req.user;

  try {
    const clients = await searchForClient({ usuario_id: id });

    if (!clients) {
      return res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  consultClient,
};
