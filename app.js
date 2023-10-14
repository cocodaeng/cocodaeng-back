const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const memberRouter = require("./src/routes/member-route");
app.use("/api/v1/member", memberRouter);

const appleRouter = require("./src/routes/apple-route");
app.use("/api/v1/oauth/apple", appleRouter);

const kakaoRouter = require("./src/routes/kakao-route");
app.use("/api/v1/oauth/kakao", kakaoRouter);

const petRouter = require("./src/routes/pet-route");
app.use("/api/v1/pet", petRouter);

const allergyRouter = require("./src/routes/allergy-route");
app.use("/api/v1/allergy", allergyRouter);

app.listen(9000, () => console.log("Listening on port 9000!"));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
