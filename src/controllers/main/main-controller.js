/* 홈 화면 컨트롤러 */
const MainService = require("../../services/main/main-service");
const HttpStatus = require("http-status");
const JwtDecode = require("../../utils/jwt-decoder");

/* 홈 화면 조회하는 메소드 - 조만제 */
exports.findMainPage = async (req, res, next) => {
  const token = req.headers.authorization;
  const memberNo = JwtDecode.getMemberNoFromToken(token);
  try {
    const result = await MainService.findMainPage(memberNo);
    console.log("MainController findMainPage result : ", result);

    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "홈 화면 조회 성공",
        data: result,
      });
    }
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND, // 404
        message: "홈 화면 조회 실패",
        code: -999999,
        links: [
          {
            rel: "findMainPage",
            method: "GET",
            href: "api/v1/main/mainPage",
          },
        ],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      links: [
        {
          rel: "findMainPage",
          method: "GET",
          href: "api/v1/main/mainPage",
        },
      ],
    });
  }
};
