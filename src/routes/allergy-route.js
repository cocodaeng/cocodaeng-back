const express = require("express");
const router = express.Router();
const AllergyController = require("../controllers/allergy/allergy-controller");

router.get("/", AllergyController.findAllAllergies);

module.exports = router;
