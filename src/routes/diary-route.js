const express = require("express");
const router = express.Router();
const DiaryController = require("../controllers/diary/diary-controller");
const { auth } = require("../middleware/auth-middleware");
const { createImageUploader } = require("../utils/image-uploader");

const DiaryUploader = createImageUploader("diary", [
  { name: "diary_photo_left_eye", maxCount: 1 },
  { name: "diary_photo_right_eye", maxCount: 1 },
  { name: "diary_photo_left_ear", maxCount: 1 },
  { name: "diary_photo_right_ear", maxCount: 1 },
  { name: "diary_photo_anal", maxCount: 1 },
  { name: "diary_photo_etc", maxCount: 1 },
]);

router.get("/findDiaries/:pet_no", auth, DiaryController.findDiaries);
router.get("/:diary_no", auth, DiaryController.findDiaryByDiaryNo);
router.post(
  "/",
  auth,
  DiaryUploader[0],
  DiaryUploader[1],
  DiaryController.createDiary
);
router.put(
  "/:diary_no",
  auth,
  DiaryUploader[0],
  DiaryUploader[1],
  DiaryController.updateDiary
);
router.delete("/:diary_no", auth, DiaryController.deleteDiary);

module.exports = router;
