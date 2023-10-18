/* 카카오 API */
const redaxios = require("redaxios");
const TokenDTO = require("../../dto/token-dto");
const KakaoDTO = require("../../dto/kakao-dto");

/* 카카오 토큰 발급 메소드 - 조만제 */
exports.getKakaoToken = (code) => {
  const reqURL = "https://kauth.kakao.com/oauth/token";

  axios
    .post(reqURL)
    .body(
      "grant_type=authorization_code" +
        "&client_id= " + // REST API 키
        "&redirect_uri=http://localhost:9000/api/v1/oauth/kakao/login" + // Redirect URI
        "&code=" +
        code
    )
    .then((response) => {
      console.log(response);
      const token = new TokenDTO(response.access_token, response.refresh_token);
      console.log(token);
      return token;
    })
    .catch((error) => console.log(error));
};

/* 카카오 회원 정보 조회 메소드 - 조만제 */
exports.getKakaoMemberInfo = (token) => {
  const reqURL = "https://kapi.kakao.com/v2/user/me";

  axios
    .post(reqURL, {
      headers: { Authorization: "Bearer " + token.access_token },
    })
    .then((response) => {
      console.log(response);
      return (kakaoMemberInfo = new KakaoDTO(response.id, response.name));
    })
    .catch((error) => console.log(error));
};
