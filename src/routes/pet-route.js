const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");
const ImageUploader = require("../utils/image-uploader");

// bread
router.get("/bread", BreadController.findAllBreads);
router.get("/bread/:breadNo", BreadController.findBreadByBreadNo);
router.post("/bread", auth, BreadController.createBread);
router.put("/bread/:breadNo", auth, BreadController.updateBread);
router.delete("/bread/:breadNo", auth, BreadController.deleteBread);

// pet
router.get("/findPet", auth, PetController.findPet);
router.post("/", auth, ImageUploader, PetController.createPet);

module.exports = router;
