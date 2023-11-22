const express = require("express");

const { registerClient } = require("./controllers/register");
const { consultClient } = require("./controllers/consult");
const schemaClient = require("./validations/schemaClient");
const validateRegisterClient = require("./middlewares/validateRegisterClient");
const validateRequest = require("./middlewares/validateRequest");
const loginSchema = require("./validations/loginSchema");
const { login } = require("./controllers/authentication");
const { register } = require("./controllers/UserController.js");
const validateUser = require("./middlewares/validateUser.js");
const userSchema = require("./validations/userSchema.js");
const updateUser = require("./controllers/updateUser.js");
const filterAuthorization = require("./middlewares/filterAuthorization.js");
const validateUpdateUser = require("./middlewares/validateUpdateUser.js");
const schemaUpdateUser = require("./validations/schemaUpdateUser.js");
const schemaEditClient = require("./validations/schemaEditClient.js");
const validateEditClient = require("./middlewares/validateEditClient.js");
const editClient = require("./controllers/editClient.js");

const routes = express();

routes.post("/signup", validateUser(userSchema), register);

routes.post("/login", validateRequest(loginSchema), login);

routes.use(filterAuthorization);

routes.post(
  "/registerClient",
  validateRegisterClient(schemaClient),
  registerClient
);

routes.get("/consultClient", consultClient);

routes.put("/updateUser", validateUpdateUser(schemaUpdateUser), updateUser);
routes.put("/editClient/:id", validateEditClient(schemaEditClient), editClient);

module.exports = routes;
