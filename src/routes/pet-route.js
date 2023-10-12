const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const PetController = require("../controllers/pet/pet-controller");

/*
    펫 조회
*/
router.get("/findPet", auth, PetController.findPet);

module.exports = router;
