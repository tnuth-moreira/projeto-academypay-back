const express = require("express");
const validateRequest = require("./middlewares/validateRequest");
const loginSchema = require("./validations/loginSchema");
const { login } = require("./controllers/authentication");

const router = express();

router.post("/login", validateRequest(loginSchema), login);

module.exports = router;
