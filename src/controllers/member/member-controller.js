/* 회원 컨트롤러 */
const MemberService = require("../../services/member/member-service");
const HttpStatus = require("http-status");
const JwtDecode = require("../../utils/jwt-decoder");

/* 특정 회원 조회 메소드 - 조만제 */
exports.findMember = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecode.getMemberNoFromToken(token);
    const result = await MemberService.findMemberByMemberNo(memberNo);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "회원 조회 성공",
      data: result[0],
    });
  } catch (err) {
    err.links = [
      {
        rel: "findMember",
        method: "GET",
        href: "api/v1/member",
      },
    ];
    next(err);
  }
};
