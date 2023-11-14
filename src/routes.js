const express = require("express");
const { registerClient } = require("./controllers/register");
const { consultClient } = require("./controllers/consult");
const schemaClient = require("./validations/schemaClient");
const validateRegisterClient = require("./middlewares/validateRegisterClient");

const routes = express();

routes.post(
  "/registerClient",
  validateRegisterClient(schemaClient),
  registerClient
);

routes.get("/consult", consultClient);

module.exports = routes;
