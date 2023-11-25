const knex = require("./config");

async function saveCharge(charge) {
  console.log(charge);
  const newCharge = await knex("cobrancas")
    .insert({ ...charge })
    .returning("*");

  return newCharge[0];
}

module.exports = { saveCharge };
