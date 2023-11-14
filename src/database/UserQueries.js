const knex = require("./config");

async function save(user) {
  console.log(user);
  const userCreated = await knex("usuarios").insert(user).returning("*");

  return userCreated;
}

module.exports = { save };
