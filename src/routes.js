const express = require("express");

const router = express();

router.get("/", (req, res) => {
  res.send("Ola");
});

module.exports = router;
