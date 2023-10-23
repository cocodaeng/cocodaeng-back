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

module.exports = router;
