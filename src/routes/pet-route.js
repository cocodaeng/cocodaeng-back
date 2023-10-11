const express = require("express");
const router = express.Router();
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");

// bread
router.get("/findAllBreads", BreadController.findAllBreads);

// pet
// router.post("/createPet", PetController.createPet);

module.exports = router;
