const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");
const PetProgramController = require("../controllers/pet/pet-program-controller");
const DiaryController = require("../controllers/diary/diary-controller");
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

// 특정 펫 진행 프로그램 전체 조회
router.get("/findPetPrograms", PetProgramController.findPetPrograms);

// 다이어리 전체 조회
router.get("/findDiaries", DiaryController.findDiaries);

module.exports = router;
