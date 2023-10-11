const express = require("express");
const router = express.Router();
const KakaoController = require("../controllers/oauth/kakao-controller");

router.get("/login", KakaoController.kakaoCallBack);

module.exports = router;
