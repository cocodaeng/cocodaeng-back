const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const MainController = require("../controllers/main/main-controller");

// 홈 화면 조회
router.get("/findMainPage", MainController.findMainPage);

module.exports = router;
