/* 서비스 약관 시작 페이지 */
const HttpStatus = require("http-status");
const dotenv = require("dotenv");

dotenv.config();

/* 서비스 이용약관 조회 메소드 - 조만제 */
exports.getAgreeService = (req, res, next) => {
  res.status(HttpStatus.OK).send({
    data: [
      {
        design: {},
        text: process.env.START,
      },
    ],
  });
};
