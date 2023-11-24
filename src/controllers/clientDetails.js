// const { searchForClient, ... } = require("../database/ClientQuery");

// const consultClientDetails = async (req, res) => {
//   const clientId = req.params.id;

//   try {
//     const clientDetails = await searchForClient({ id: clientId });

//     if (!clientDetails) {
//       return res.status(404).json({ mensagem: "Cliente não encontrado" });
//     }

//     const ... = await ...(clientId);

//     res.status(200).json({ clientDetails: clientDetails[0], clientInvoices });
//   } catch (error) {
//     console.error("Erro ao obter detalhes do cliente:", error);
//     res.status(500).json({ erro: "Erro ao obter detalhes do cliente" });
//   }
// };

// module.exports = consultClientDetails;
