const express = require("express");
const { registerClient } = require("./controller/register");
const { consultClient } = require("./controller/consult");
const schemaClient = require("./validation/schemaClient");
const validateRegisterClient = require("./middleware/validateRegisterClient");

const routes = express();

routes.post(
  "/registerClient",
  validateRegisterClient(schemaClient),
  registerClient
);

routes.get("/consult", consultClient);

module.exports = routes;
