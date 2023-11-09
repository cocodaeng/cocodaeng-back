const HttpStatus = require("http-status");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage"); // 다중 업로드를 위해 PutObjectCommand 대신 lib-storage 사용
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const JwtDecode = require("../utils/jwt-decoder");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// const dotenv = require("dotenv");
// dotenv.config();

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

// Multer 설정
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createImageUploader = (directory, fields) => {
  const ImageUploader = upload.fields(fields);

  const uploadToS3 = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const memberNo = JwtDecode.getMemberNoFromToken(token);

      if (!req.files) {
        next();
      }

      let files = [];
      for (let field in req.files) {
        files.push(req.files[field]);
      }
      console.log("이미지 업로더 속 files 설정", files);

      if (files.length === 0) {
        const error = new Error(
          "펫 상태를 기록하기 위해 사진을 최소 한 장 이상 업로드해주세요."
        );
        error.status = HttpStatus.BAD_REQUEST;
        next(error);
      }

      for (const file of files) {
        console.log(file[0].originalname);
        const extension = path.extname(file[0].originalname);

        if (!allowedExtensions.includes(extension)) {
          const error = new Error("이미지 형식의 파일만 업로드 가능합니다.");
          error.status = HttpStatus.BAD_REQUEST;
          next(error);
        }

        const date = new Date().toISOString().split("T")[0];
        const key = `${directory}/${file[0].fieldname}/${uuidv4()}_${date}_${
          file[0].fieldname
        }${extension}`;

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: file[0].buffer,
          ACL: "public-read-write",
        };

        const uploader = new Upload({ client: s3Client, params: params });
        await uploader.done();

        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${key}`;
        file[0].path = url;
      }

      next();
    } catch (err) {
      next(err);
    }
  };

  return [ImageUploader, uploadToS3];
};

module.exports.createImageUploader = createImageUploader;
