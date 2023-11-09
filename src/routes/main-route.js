/* 페이지 경로 */
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const MainController = require("../controllers/main/main-controller");
const FoodExplorationController = require("../controllers/main/food-exploration-controller");
const { check, validationResult } = require("express-validator");
const HttpStatus = require("http-status");

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

/* 홈 화면 조회 - 조만제 */
router.get("/mainPage", auth, MainController.findMainPage);

/* 식재료 탐험 페이지 조회 - 조만제 */
router.get(
  "/foodExplorationPage",
  auth,
  FoodExplorationController.findPetJoinProgram
);

/* 기 참여 프로그램 조회 - 조만제 */
router.get(
  "/foodExplorationPage/participation/:program_no",
  auth,
  FoodExplorationController.findParticipationProgram
);

/* 미 참여 프로그램 조회 - 조만제 */
router.get(
  "/foodExplorationPage/nonparticipation/:program_no",
  auth,
  FoodExplorationController.findNonParticipationProgram
);

/* 미 참여 프로그램 시작 - 조만제 */
router.post(
  "/foodExplorationPage/startParticipation",
  auth,
  [
    check("pet_no")
      .trim()
      .notEmpty()
      .withMessage("pet_no를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("program_no")
      .trim()
      .notEmpty()
      .withMessage("프로그램 번호를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("program_name")
      .trim()
      .notEmpty()
      .withMessage("프로그램 이름을 담아주세요."),

    validation,
  ],
  FoodExplorationController.startParticipationProgram
);

module.exports = router;
