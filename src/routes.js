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
const { clientDetails } = require("./controllers/clientDetails");

const addCharge = require("./controllers/chargeController.js");
const chargeSchema = require("./validations/chargeSchema.js");
const validateCharge = require("./middlewares/validateCharge.js");
const updateChargeSchema = require("./validations/updateChargeSchema.js");
const updateCharge = require("./middlewares/updateCharge.js");
const updateChargeController = require("./controllers/updateChargeController.js");

const allCharges = require("./controllers/allCharges.js");
const deleteCharge = require("./controllers/deleteCharge.js");

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

routes.get("/clientDetails/:clientId", clientDetails);

routes.put("/updateUser", validateUpdateUser(schemaUpdateUser), updateUser);

routes.put(
  "/updateClient/:clientId",
  validateUpdateClient(schemaUpdateClient),
  updateClient
);

routes.post("/addCharge", validateCharge(chargeSchema), addCharge);

routes.get("/allCharges/:clientId", allCharges);

routes.delete("/deleteCharge/:idCharge", deleteCharge);

routes.post("/addCharge", validateCharge(chargeSchema), addCharge);
routes.put(
  "/updateCharge",
  updateCharge(updateChargeSchema),
  updateChargeController
);

module.exports = routes;
