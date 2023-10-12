const multer = require("multer");
const multer_s3 = require("multer_s3");

const upload = multer({
  storage: multer.diskStorage({
    // destination: 어느 폴더에 저장할지 지정
    destination: function (req, file, callback) {
      callback(null, "./uplad");
    },
    // filename: 폴더 안에 저장되는 파일 명 결정
    filename: function (req, file, callback) {
      callback(null, Date.now() + "-" + file.originalname);
    },
  }),
});
