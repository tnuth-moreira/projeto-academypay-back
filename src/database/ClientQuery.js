const knex = require("./config");

async function searchForClient(column) {
  const data = await knex("clientes")
    .where({ ...column })
    .returning("*");

  return data;
}

async function saveClient(client) {
  const newClient = await knex("clientes").insert(client).returning("*");

  return newClient[0];
}

module.exports = { searchForClient, saveClient };
