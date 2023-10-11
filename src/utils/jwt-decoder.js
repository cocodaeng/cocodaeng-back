const jwt = require("jsonwebtoken");

exports.decodeJWT = (bearerToken) => {
  const token = bearerToken.split("Bearer ");
  const claims = jwt.decode(token[1]);
  return claims;
};

exports.getMemberNoFromToken = (token) => {
  const jwtoken = this.decodeJWT(token);
  const memberNo = jwtoken.memberNo;
  return memberNo;
};

exports.getExpirationFromToken = (token) => {
  const expiration = jwt.decodeJWT(token).exp;
  return expiration;
};
