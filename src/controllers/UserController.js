const { hash } = require("bcrypt");
const { save } = require("../database/UserQueries");

async function register(req, res) {
  const { nome, email, senha } = req.body;

  console.log(req.body);

  try {
    const encryptedPass = await hash(senha, 10);

    await save({ nome, email, senha: encryptedPass });

    return res.status(201).json({ mensagem: "Usuario criado" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = { register };
