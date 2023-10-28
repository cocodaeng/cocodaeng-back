/* 펫 관련 경로 */
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");
const PetProgramController = require("../controllers/pet/pet-program-controller");
const { createImageUploader } = require("../utils/image-uploader");

/* 견종 라우터 - 김종완 */
router.get("/bread", BreadController.findAllBreads);
router.get("/bread/:bread_no", BreadController.findBreadByBreadNo);
router.post("/bread", auth, BreadController.createBread);
router.put("/bread/:bread_no", auth, BreadController.updateBread);
router.delete("/bread/:bread_no", auth, BreadController.deleteBread);

const PetProfileUploader = createImageUploader("pet-profile", [
  { name: "profile", maxCount: 1 },
]);

/* 펫 라우터 - 조만제, 김종완 */
router.get("/", auth, PetController.findPetsByMemberNo);
router.post(
  "/",
  auth,
  PetProfileUploader[0],
  PetProfileUploader[1],
  PetController.createPet
);

/* 특정 펫 진행 프로그램 전체 조회 라우터 - 조만제 */
router.get("/findPetPrograms", PetProgramController.findPetProgramsByPetNo);

module.exports = router;
