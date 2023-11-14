const { saveClient } = require("../database/ClientQuery");

const registerClient = async (req, res) => {
  const { telefone } = req.body;

  try {
    const newClient = await saveClient({
      ...req.body,
      telefone: telefone,
    });

    if (!newClient) {
      return res.status(400).json({ mensagem: "O cliente não foi cadastrado" });
    }

    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: error.message });
  }
};

module.exports = {
  registerClient,
};
