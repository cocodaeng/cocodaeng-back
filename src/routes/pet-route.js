const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");

// bread
router.get("/bread", BreadController.findAllBreads);
router.get("/bread/:breadNo", BreadController.findBreadByBreadNo);
router.post("/bread", BreadController.createBread);
router.put("/bread/:breadNo", BreadController.updateBread);
router.delete("/bread/:breadNo", BreadController.deleteBread);

// pet
router.get("/findPet", auth, PetController.findPet);
router.post("/", PetController.createPet);

module.exports = router;
