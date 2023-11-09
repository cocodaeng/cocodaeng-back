const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result/result-controller");
const { auth } = require("../middleware/auth-middleware");
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

/* 결과 페이지 조회 - 김종완*/
router.get("/findFinalResult", auth, ResultController.findFinalResult);
router.get("/findAllResults", auth, ResultController.findAllResults);
router.put(
  "/:pet_program_no",
  auth,
  [
    check("program_result")
      .trim()
      .notEmpty()
      .withMessage("진행 프로그램 결과를 담아주세요.")
      .matches(/^[0-4]$/)
      .withMessage("프로그램은 0~4 사이의 숫자만 입력 가능합니다."),

    check("pet_program_no")
      .trim()
      .notEmpty()
      .withMessage("펫 진행 프로그램 번호를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    validation,
  ],
  ResultController.updateResult
);

module.exports = router;
