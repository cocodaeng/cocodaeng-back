/* 페이지 경로 */
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const MainController = require("../controllers/main/main-controller");
const FoodExplorationController = require("../controllers/main/food-exploration-controller");

/* 홈 화면 조회 - 조만제 */
router.get("/mainPage", auth, MainController.findMainPage);

/* 식재료 탐험 페이지 조회 - 조만제 */
router.get(
  "/foodExplorationPage",
  auth,
  FoodExplorationController.findPetJoinProgram
);

/* 기참여 프로그램 조회 - 조만제 */
router.get(
  "/foodExplorationPage/:program_no",
  auth,
  FoodExplorationController.findParticipationProgram
);

module.exports = router;
