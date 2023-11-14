const express = require("express");

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


module.exports = router;
