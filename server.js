const express = require("express");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const HttpStatus = require("http-status");
const app = express();

app.use(morgan("dev")); // 로그 수집 툴
app.use(express.json()); // 요청-응답 JSON 화
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

/* 라우터 import */
const mainRouter = require("./src/routes/main-route");
const memberRouter = require("./src/routes/member-route");
const appleRouter = require("./src/routes/apple-route");
const kakaoRouter = require("./src/routes/kakao-route");
const petRouter = require("./src/routes/pet-route");
const allergyRouter = require("./src/routes/allergy-route");
const diaryRouter = require("./src/routes/diary-route");
const resultRouter = require("./src/routes/result-route");

/* 요청 매핑 */
app.use("/api/v1/main", mainRouter);
app.use("/api/v1/member", memberRouter);
app.use("/api/v1/oauth/apple", appleRouter);
app.use("/api/v1/oauth/kakao", kakaoRouter);
app.use("/api/v1/pet", petRouter);
app.use("/api/v1/allergy", allergyRouter);
app.use("/api/v1/diary", diaryRouter);
app.use("/api/v1/result", resultRouter);

app.listen(8080, () => console.log("Listening on port 8080!"));

/* 공용 에러 핸들러 - 김종완 */
app.use((err, req, res, next) => {
  let statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR; // 기본값으로 500을 사용
  console.error(err);
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    links: err.links,
  });
});
