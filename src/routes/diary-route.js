const express = require("express");
const router = express.Router();
const DiaryController = require("../controllers/diary/diary-controller");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.get("/findDiaries/:pet_no", DiaryController.findDiaries);
router.get("/:diary_no", DiaryController.findDiaryByDiaryNo);
router.post("/", upload.any(), DiaryController.createDiary);
router.put("/:diary_no", upload.any(), DiaryController.updateDiary);
router.delete("/:diary_no", DiaryController.deleteDiary);

module.exports = router;
