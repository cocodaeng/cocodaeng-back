/* 애플 컨트롤러 */
const AppleService = require("../../services/oauth/apple-service");
const HttpStatus = require("http-status");

/* 애플 로그인 메소드 - 김종완 */
exports.appleLogin = async (req, res, next) => {
  try {
    //authenticate our code we recieved from apple login with our key file
    const result = await AppleService.appleLogin(req.body.code, req.body.user);
    res.satus(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "애플 로그인에 성공하였습니다.",
      data: result[0],
    });
  } catch (err) {
    err.links = [
      {
        rel: "appleLogin",
        method: "POST",
        href: "api/v1/oauth/apple",
      },
    ];
    next(err);
  }
};
