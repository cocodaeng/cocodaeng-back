/* 펫 관련 경로 */
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");
const PetProgramController = require("../controllers/pet/pet-program-controller");
const ImageUploader = require("../utils/image-uploader");

// bread
router.get("/bread", BreadController.findAllBreads);
router.get("/bread/:breadNo", BreadController.findBreadByBreadNo);
router.post("/bread", auth, BreadController.createBread);
router.put("/bread/:breadNo", auth, BreadController.updateBread);
router.delete("/bread/:breadNo", auth, BreadController.deleteBread);

/* 펫 조회 라우터 - 조만제 */
router.get("/findPet", auth, PetController.findPet);

router.post("/", auth, ImageUploader, PetController.createPet);

/* 특정 펫 진행 프로그램 전체 조회 라우터 - 조만제 */
router.get("/findPetPrograms", PetProgramController.findPetPrograms);

module.exports = router;
