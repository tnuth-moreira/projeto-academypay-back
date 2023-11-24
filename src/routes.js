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
const schemaUpdateClient = require("./validations/schemaUpdateClient.js");
const validateUpdateClient = require("./middlewares/validateUpdateClient.js");
const updateClient = require("./controllers/updateClient.js");
// const consultClientDetails = require("./controllers/clientDetails.js");


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
// routes.get("/clientsDetails/:id", consultClientDetails)

routes.put("/updateUser", validateUpdateUser(schemaUpdateUser), updateUser);
routes.put("/updateClient", validateUpdateClient(schemaUpdateClient), updateClient);


module.exports = routes;
