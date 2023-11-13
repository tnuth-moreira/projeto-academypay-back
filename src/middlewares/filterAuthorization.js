const jwt = require("jsonwebtoken");
const knex = require("../database/config");

const hash = process.env.JTW_HASH;

async function filterAuthorization(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Usuário não autorizado" });
  }

  const token = authorization.replace("Bearer ", "").trim();

  try {
    const { id } = jwt.verify(token, hash);

    const existingUser = await knex("usuarios").where({ id }).first();

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Usuario não localizado" });
    }

    const { senha, ...usuario } = existingUser;

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = filterAuthorization;
