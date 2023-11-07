const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result/result-controller");
const { auth } = require("../middleware/auth-middleware");

/* 결과 페이지 조회 - 김종완*/
router.get("/findFinalResult", auth, ResultController.findFinalResult);
router.get("/findAllResults", auth, ResultController.findAllResults);
router.put("/:pet_program_no", auth, ResultController.updateResult);

module.exports = router;
