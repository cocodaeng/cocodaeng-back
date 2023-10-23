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
      data: {
        member_no: result[0].member_no,
        member_name: result[0].member_name,
        kakao_id: result[0].kakao_id,
        apple_id: result[0].apple_id,
        photo_agree_status: result[0].photo_agree_status,
        policy_consent: result[0].policy_consent,
        create_date: result[0].create_Date,
        update_date: result[0].update_date,
        leave_date: result[0].leave_date,
        member_status: result[0].member_status,
        last_login_time: result[0].last_login_time,
      },
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
