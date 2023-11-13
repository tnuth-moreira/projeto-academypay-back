const express = require("express");
const updateUser = require("./validations/updateUser");
const router = express();


router.get("/", (req, res) => {
  res.send("Ola");
});

router.put("/usuarios/:id", updateUser);

module.exports = router;
