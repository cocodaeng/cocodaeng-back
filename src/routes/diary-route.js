const express = require("express");
const router = express.Router();
const DiaryController = require("../controllers/diary/diary-controller");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.get("/findDiaries", DiaryController.findDiaries);
router.get("/:diaryNo", DiaryController.findDiaryByDiaryNo);
router.post("/", upload.any(), DiaryController.createDiary);
router.put("/:diaryNo", DiaryController.updateDiary);
router.delete("/:diaryNo", DiaryController.deleteDiary);

module.exports = router;
