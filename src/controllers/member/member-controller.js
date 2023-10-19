/* 회원 컨트롤러 */
const MemberService = require("../../services/member/member-service");
const HttpStatus = require("http-status");

/* 특정 회원 조회 메소드 - 조만제 */
exports.findMember = async (req, res) => {
  const result = await MemberService.findMemberByNo(1);

  if (result !== null) {
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
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "회원 조회 실패",
      code: -999999,
      links: [
        {
          // rel: "",
          // method: "POST",
          // href: "",
        },
      ],
    });
  }
};
