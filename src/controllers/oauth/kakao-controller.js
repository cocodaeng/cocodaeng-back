/* 카카오 컨트롤러 */
const KakaoService = require("../../services/oauth/kakao-service");
const HttpStatus = require("http-status");
const KakaoDTO = require("../../dto/kakao-dto");

/* 카카오 콜백 메소드 - 조만제 */
exports.kakaoCallBack = (req, res) => {
  console.log(req);
  const result = KakaoService.kakaoLogin(req.body.code);
  console.log(result);

  if (result !== null) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "로그인 성공",
      access_token: result.access_token,
    });
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "로그인 실패",
      code: -999999,
      links: [
        {
          // rel: "",
          // method: "POST",
          // href: "",
        },
      ],
    });
  }
};

// 카카오 로그아웃
// exports.kakaoLogout = async (req, res) => {};
