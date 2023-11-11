const express = require("express");
const { register } = require("./controller/UserController.js");

const router = express();

router.post("/register", register);

module.exports = router;
