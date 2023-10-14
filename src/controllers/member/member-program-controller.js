const MemberProgramService = require("../../services/member/member-program-service");
const HttpStatus = require("http-status");

// 회원 진행 프로그램 전체 조회
exports.findMemberProgram = async (req, res) => {
  const result = await MemberProgramService.findMemberProgramByNo(1);
  let member_programs = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      member_programs[i] = {
        member_program_no: result[i].memberProgramNo,
        program_no: result[i].programNo,
        pet_no: result[i].petNo,
        member_start_date: result[i].memberStartDate,
        member_end_date: result[i].memberEndDate,
        program_seven_date: result[i].programSevenDate,
        program_fourteenth_date: result[i].programFourteenthDate,
        program_twentyone_date: result[i].programTwentyoneDate,
        program_result: result[i].programResult,
      };
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "회원 진행 프로그램 전체 조회 성공",
      member_programs: member_programs,
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
