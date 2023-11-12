const bcrypt = require("bcrypt");
const knex = require("../database/config");
const jwt = require("jsonwebtoken");

// const hash = process.env.JWT_HASH;

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("Por favor informe e-mail e senha!");
  }

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // const correctPassword = await bcrypt.compare(senha, usuario.senha);

    // if (!correctPassword) {
    //   return res.status(400).json({ mensagem: "E-mail ou senha inválida" });
    // }

    // const token = jwt.sign({ id: usuario.id }, hash, { expiresIn: "8h" });

    const { senha: _, ...dadosUsuario } = usuario;

    // return res.status(200).json({ usuario: dadosUsuario, token });

    return res.status(200).json({ usuario: dadosUsuario });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = { login };
