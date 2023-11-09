const express = require("express");
const router = express.Router();
const DiaryController = require("../controllers/diary/diary-controller");
const { auth } = require("../middleware/auth-middleware");
const { createImageUploader } = require("../utils/image-uploader");
const { check, validationResult } = require("express-validator");
const HttpStatus = require("http-status");

const DiaryUploader = createImageUploader("diary", [
  { name: "diary_photo_left_eye", maxCount: 1 },
  { name: "diary_photo_right_eye", maxCount: 1 },
  { name: "diary_photo_left_ear", maxCount: 1 },
  { name: "diary_photo_right_ear", maxCount: 1 },
  { name: "diary_photo_anal", maxCount: 1 },
  { name: "diary_photo_etc", maxCount: 1 },
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

router.get("/findDiaries/:pet_no", auth, DiaryController.findDiaries);
router.get("/:diary_no", auth, DiaryController.findDiaryByDiaryNo);
router.post(
  "/",
  auth,
  DiaryUploader[0],
  DiaryUploader[1],
  [
    check("pet_no")
      .trim()
      .notEmpty()
      .withMessage("pet_no를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("pet_program_no")
      .trim()
      .notEmpty()
      .withMessage("프로그램 번호를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("diary_content")
      .trim()
      .isLength({ min: 1 })
      .withMessage("다이어리 내용을 입력해주세요."),

    check("fodder_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("사료 명을 입력해주세요."),

    check("pet_health")
      .trim()
      .notEmpty()
      .withMessage("펫 건강 상태를 담아주세요.")
      .matches(/^[1-4]$/)
      .withMessage("1~4 사이의 숫자만 담을 수 있습니다."),

    validation,
  ],
  DiaryController.createDiary
);
router.put(
  "/:diary_no",
  auth,
  DiaryUploader[0],
  DiaryUploader[1],
  [
    check("pet_no")
      .trim()
      .notEmpty()
      .withMessage("pet_no를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("pet_program_no")
      .trim()
      .notEmpty()
      .withMessage("프로그램 번호를 담아주세요.")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 담을 수 있습니다."),

    check("diary_content")
      .trim()
      .isLength({ min: 1 })
      .withMessage("다이어리 내용을 입력해주세요."),

    check("fodder_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("사료 명을 입력해주세요."),

    check("pet_health")
      .trim()
      .notEmpty()
      .withMessage("펫 건강 상태를 담아주세요.")
      .matches(/^[1-4]$/)
      .withMessage("1~4 사이의 숫자만 담을 수 있습니다."),

    check("diary_status")
      .matches(/^[01]$/)
      .withMessage("0과 1 사이의 숫자만 담을 수 있습니다."),

    validation,
  ],
  DiaryController.updateDiary
);

router.delete(
  "/:diary_no",
  auth,
  [
    check("diary_no")
      .matches(/^[0-9]*$/)
      .withMessage("숫자만 입력할 수 있습니다."),

    validation,
  ],
  DiaryController.deleteDiary
);

module.exports = router;
