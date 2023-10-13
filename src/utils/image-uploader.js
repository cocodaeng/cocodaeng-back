const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

// Multer 설정
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ImageUploader = upload.array("images", 10); // array("필드 이름", '최대 개수')

ImageUploader.singleOrArray = (field, maxCount) => {
  const middleware = upload.fields([{ name: field, maxCount }]);
  return (req, res, next) => {
    middleware(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (!req.files || !req.files[field]) {
        req.files = null;
      }
      next();
    });
  };
};

ImageUploader.uploadToS3 = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = jwtDecode.getMemberNoFromToken(token);

    let files = [];
    // 다중 이미지 업로드인 경우
    if (Array.isArray(req.files)) {
      files = req.files;
    }
    // 단일 이미지 업로드인 경우
    if (req.file) {
      files = [req.file];
    }
    // 이미지가 첨부가 안되었을 경우
    if (files.length === 0) {
      throw new Error("이미지 파일이 존재하지 않습니다.");
    }

    const uploadedImageURLs = [];

    for (const file of files) {
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        throw new Error("이미지 형식 파일이 아닙니다.");
      }

      const key = `${memberNo}_${uuidv4()}${extension}`;

      const params = {
        Bucket: "bucket", // S3 버켓 이름
        key: key,
        Body: file.buffer,
        ACL: "public-read-write",
      };

      await s3Client.send(new PutObjectCommand(params));

      uploadedImageURLs.push(
        `https://YOUR_BUCKET_NAME.s3.ap-northeast-2.amazonaws.com/${key}`
      );
    }

    req.petProfilePicture = uploadedImageURLs;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = ImageUploader;
