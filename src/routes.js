const express = require("express");
const { register } = require("./controllers/UserController.js");
const validateUser = require("./middlewares/validateUser.js");
const userSchema = require("./validations/userSchema.js");

const router = express();

router.post("/register", validateUser(userSchema), register);

module.exports = router;
