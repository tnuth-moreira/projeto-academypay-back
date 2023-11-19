const { hash } = require("bcrypt");
const { saveUser, findUser } = require("../database/UserQueries");

async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPass = await hash(senha, 10);

    const userFound = await findUser({ email });

    if (userFound) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const {
      senha: _,
      cpf,
      telefone,
      ...userData
    } = await saveUser({
      nome,
      email,
      senha: encryptedPass,
    });

    return res.status(201).json({
      mensagem: "Usuario criado",
      usuario: {
        ...userData,
      },
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = { register };
