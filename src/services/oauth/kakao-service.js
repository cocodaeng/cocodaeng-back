/* 카카오 서비스 */
const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const KakaoAPI = require("../../apis/oauth/kakao-api");
const KakaoDTO = require("../../dto/kakao-dto");
const MemberService = require("../../services/member/member-service");

/* 카카오 로그인 메소드 - 조만제 */
exports.kakaoLogin = (code) => {
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = process.env.JWT_EXP;
  const issuer = process.env.JWT_ISSUER;
  const option = { expiresIn, issuer };

  const kakaoToken = KakaoAPI.getKakaoToken(code); // 카카오 토큰
  console.log("kakaoToken : " + kakaoToken);
  const kakaoMemberInfo = kakaoAPI.getKakaoMemberInfo(kakaoToken); // 카카오 회원 정보
  console.log("kakaoMemberInfo : " + kakaoMemberInfo);
  const memberInfo = MemberService.registMember(kakaoMemberInfo);
  if (memberInfo !== null) {
    const payload = {
      member_no: memberInfo.member_no,
      member_name: memberInfo.member_name,
      photo_agree_status: memberInfo.photo_agree_status,
      policy_consent: memberInfo.policy_consent,
    };
    return jwt.sign(payload, secretKey, option); // jwt 토큰 발급
  }
  return null;
};

/* 카카오 로그아웃 메소드 - 조만제 */
exports.kakaoLogout = () => {};
