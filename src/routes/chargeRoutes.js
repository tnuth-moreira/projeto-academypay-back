const express = require("express");
const routes = express();

const filterAuthorization = require("../middlewares/filterAuthorization.js");
const addCharge = require("../controllers/chargeControllers/addCharge.js");
const chargeSchema = require("../validations/charge/chargeSchema.js");
const validateCharge = require("../middlewares/charge/validateCharge.js");
const updateChargeSchema = require("../validations/charge/updateChargeSchema.js");
const updateCharge = require("../middlewares/charge/updateCharge.js");
const updateChargeController = require("../controllers/chargeControllers/updateCharge.js");
const allCharges = require("../controllers/chargeControllers/allCharges.js");
const deleteCharge = require("../controllers/chargeControllers/deleteCharge.js");
const chargeDetails = require("../controllers/chargeControllers/chargeDetails.js");

routes.use(filterAuthorization);

routes.post("/addCharge", validateCharge(chargeSchema), addCharge);
routes.get("/allCharges", allCharges);
routes.get("/chargeDetails/:idCharge", chargeDetails);
routes.put(
  "/updateCharge",
  updateCharge(updateChargeSchema),
  updateChargeController
);
routes.delete("/deleteCharge/:idCharge", deleteCharge);

module.exports = routes;
