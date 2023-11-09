/* 펫 관련 경로 */
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const BreadController = require("../controllers/pet/bread-controller");
const PetController = require("../controllers/pet/pet-controller");
const PetProgramController = require("../controllers/pet/pet-program-controller");
const { createImageUploader } = require("../utils/image-uploader");
const { check, validationResult } = require("express-validator");
const HttpStatus = require("http-status");

const PetProfileUploader = createImageUploader("pet", [
  { name: "pet_profile", maxCount: 1 },
]);

/* 유효성 체크 미들웨어 - 김종완 */
const validation = (req, res, next) => {
  console.log(req.body);
  const valResult = validationResult(req);
  console.log(valResult);
  if (!valResult.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      code: HttpStatus.BAD_REQUEST,
      message: valResult.array()[0].msg,
    });
  }
  next();
};

/* 견종 라우터 - 김종완 */
router.get("/bread", BreadController.findAllBreads);
router.get("/bread/:bread_no", BreadController.findBreadByBreadNo);
router.post("/bread", auth, BreadController.createBread);
router.put("/bread/:bread_no", auth, BreadController.updateBread);
router.delete("/bread/:bread_no", auth, BreadController.deleteBread);

/* 펫 라우터 - 조만제, 김종완 */
router.get("/", auth, PetController.findPetsByMemberNo);
router.get("/:pet_no", auth, PetController.findPetByPetNo);
router.post(
  "/",
  auth,
  PetProfileUploader[0],
  PetProfileUploader[1],
  [
    check("bread_no")
      .trim()
      .notEmpty()
      .withMessage("견종 번호를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("pet_name").trim().notEmpty().withMessage("펫 이름을 입력해주세요."),

    check("pet_age")
      .trim()
      .notEmpty()
      .withMessage("펫 나이를 입력해주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 입력해주세요."),

    check("pet_weight")
      .trim()
      .notEmpty()
      .withMessage("펫 몸무게를 입력해주세요.")
      .matches(/^\d{1,2}(\.\d{1,2})?$/)
      .withMessage("몸무게는 0~99.99kg 까지 입력 가능합니다."),

    validation,
  ],
  PetController.createPet
);

/* 특정 펫 진행 프로그램 전체 조회 라우터 - 조만제 */
router.get("/findPetPrograms", PetProgramController.findPetProgramsByPetNo);

module.exports = router;
