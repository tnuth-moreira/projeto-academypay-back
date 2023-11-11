const express = require("express");
const { register } = require("./controller/UserController.js");
const validateUser = require("./middleware/validateUser.js");
const userSchema = require("./validation/userSchema.js");

const router = express();

router.post("/register", validateUser(userSchema), register);

module.exports = router;
