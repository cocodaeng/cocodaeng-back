const jwt = require("jsonwebtoken");

/* 토큰 decoder - 김종완 */
exports.decodeJWT = (bearerToken) => {
  const token = bearerToken.split("Bearer ");
  const claims = jwt.decode(token[1]);
  return claims;
};

/* 토큰으로부터 MemberNo를 추출하는 메소드 - 김종완 */
exports.getMemberNoFromToken = (token) => {
  const jwtoken = this.decodeJWT(token);
  const memberNo = jwtoken.member_no;
  return memberNo;
};

/* 토큰 유효 시간 추출해주는 메소드 - 김종완 */
exports.getExpirationFromToken = (token) => {
  const expiration = jwt.decodeJWT(token).exp;
  return expiration;
};
