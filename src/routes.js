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


const updateUser = require("./validations/updateUser");
const router = express();


const validateRequest = require("./middlewares/validateRequest");
const loginSchema = require("./validations/loginSchema");
const { login } = require("./controllers/authentication");

const router = express();

router.post("/login", validateRequest(loginSchema), login);

const { register } = require("./controllers/UserController.js");
const validateUser = require("./middlewares/validateUser.js");
const userSchema = require("./validations/userSchema.js");

const router = express();

router.post("/register", validateUser(userSchema), register);



router.put("/usuarios/:id", updateUser);

module.exports = router;

