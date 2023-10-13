const MemberService = require("../../services/member/member-service");
const HttpStatus = require("http-status");

// 특정 회원 조회
exports.findMember = async (req, res) => {
  const result = await MemberService.findMemberByNo(1);

  if (result !== null) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "회원 조회 성공",
      member: {
        member_no: result.memberNo,
        member_name: result.memberName,
        kakao_id: result.kakaoId,
        apple_id: result.appleId,
        photo_agree_status: result.photoAgreeStatus,
        policy_consent: result.policyConsent,
        create_date: result.createDate,
        update_date: result.updateDate,
        leave_date: result.leaveDate,
        leave_status: result.leaveStatus,
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
