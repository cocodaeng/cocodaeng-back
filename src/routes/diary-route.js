const express = require("express");
const router = express.Router();
const DiaryController = require("../controllers/diary/diary-controller");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const { auth } = require("../middleware/auth-middleware");

router.get("/findDiaries/:pet_no", auth, DiaryController.findDiaries);
router.get("/:diary_no", auth, DiaryController.findDiaryByDiaryNo);
router.post("/", auth, upload.any(), DiaryController.createDiary);
router.put("/:diary_no", auth, upload.any(), DiaryController.updateDiary);
router.delete("/:diary_no", auth, DiaryController.deleteDiary);

module.exports = router;
