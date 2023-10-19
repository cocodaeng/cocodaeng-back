/* 토큰 검증 미들웨어 */
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

/* 토큰 검증하는 미들웨어 메소드 - 조만제 */
exports.auth = (req, res, next) => {
  // 인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 시크릿키를 사용하여 토큰을 req.decoded에 반환
    // postman 테스트를 위한 임시 주석
    // req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
    return next();
  } catch (error) {
    // 인증 실패
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        status: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};
