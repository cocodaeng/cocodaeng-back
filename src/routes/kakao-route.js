/* 카카오 경로 */

const express = require("express");
const router = express.Router();
const KakaoController = require("../controllers/oauth/kakao-controller");

/* 카카오 로그인 라우터 - 조만제 */
router.get("/login", KakaoController.kakaoCallBack);

module.exports = router;
