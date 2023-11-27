const express = require("express");

const {
  registerClient,
} = require("./controllers/clientControllers/register.js");
const { consultClient } = require("./controllers/clientControllers/consult.js");
const schemaClient = require("./validations/client/schemaClient.js");
const validateRegisterClient = require("./middlewares/client/validateRegisterClient.js");
const validateRequest = require("./middlewares/user/validateRequest.js");
const loginSchema = require("./validations/user/loginSchema.js");
const { login } = require("./controllers/userControllers/authentication.js");
const { register } = require("./controllers/userControllers/UserController.js");
const validateUser = require("./middlewares/user/validateUser.js");
const userSchema = require("./validations/user/userSchema.js");
const updateUser = require("./controllers/userControllers/updateUser.js");
const filterAuthorization = require("./middlewares/filterAuthorization.js");
const validateUpdateUser = require("./middlewares/user/validateUpdateUser.js");
const schemaUpdateUser = require("./validations/user/schemaUpdateUser.js");
const schemaUpdateClient = require("./validations/client/schemaUpdateClient.js");
const validateUpdateClient = require("./middlewares/client/validateUpdateClient.js");
const updateClient = require("./controllers/clientControllers/updateClient.js");
const {
  clientDetails,
} = require("./controllers/clientControllers/clientDetails.js");

const addCharge = require("./controllers/chargeControllers/chargeController.js");
const chargeSchema = require("./validations/charge/chargeSchema.js");
const validateCharge = require("./middlewares/charge/validateCharge.js");
const updateChargeSchema = require("./validations/charge/updateChargeSchema.js");
const updateCharge = require("./middlewares/charge/updateCharge.js");
const updateChargeController = require("./controllers/chargeControllers/updateChargeController.js");

const allCharges = require("./controllers/chargeControllers/allCharges.js");
const deleteCharge = require("./controllers/chargeControllers/deleteCharge.js");

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

routes.get("/allCharges/:clientId", allCharges);

routes.delete("/deleteCharge/:idCharge", deleteCharge);

routes.post("/addCharge", validateCharge(chargeSchema), addCharge);
routes.put(
  "/updateCharge",
  updateCharge(updateChargeSchema),
  updateChargeController
);

module.exports = routes;
