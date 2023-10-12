const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((err, req, res, next) => {
  console.log("여긴 미들웨어!!! 여긴 미들웨어!!");
  res.json({ status: err.status });
  res.json({ message: err.message });
});

const memberRouter = require("./src/routes/member-route");
app.use("/api/v1/member", memberRouter);

const petRouter = require("./src/routes/pet-route");
app.use("/api/v1/pet", petRouter);

const appleRouter = require("./src/routes/apple-route");
app.use("/api/v1/oauth/apple", appleRouter);

const kakaoRouter = require("./src/routes/kakao-route");
app.use("/api/v1/oauth/kakao", kakaoRouter);

app.listen(9000, () => console.log("Listening on port 9000!"));
