const { saveClient } = require("../database/ClientQuery");

const registerClient = async (req, res) => {
  try {
    const newClient = await saveClient({
      ...req.body,
    });

    if (!newClient) {
      return res.status(400).json({ mensagem: "O cliente não foi cadastrado" });
    }

    return res
      .status(201)
      .json({
        mensagem: "Cliente cadastrado com sucesso",
        Cliente: { ...newClient },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", erro: error.message });
  }
};

module.exports = {
  registerClient,
};
