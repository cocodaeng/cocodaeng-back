const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const mainRouter = require("./src/routes/main-route");
const memberRouter = require("./src/routes/member-route");
const appleRouter = require("./src/routes/apple-route");
const kakaoRouter = require("./src/routes/kakao-route");
const petRouter = require("./src/routes/pet-route");
const allergyRouter = require("./src/routes/allergy-route");
const diaryRouter = require("./src/routes/diary-route");
const HttpStatus = require("http-status");

app.use("/api/v1/main", mainRouter);
app.use("/api/v1/member", memberRouter);
app.use("/api/v1/oauth/apple", appleRouter);
app.use("/api/v1/oauth/kakao", kakaoRouter);
app.use("/api/v1/pet", petRouter);
app.use("/api/v1/allergy", allergyRouter);
app.use("/api/v1/diary", diaryRouter);

app.listen(9000, () => console.log("Listening on port 9000!"));

app.use((err, req, res, next) => {
  let statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR; // 기본값으로 500을 사용
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    links: err.links,
  });
});
