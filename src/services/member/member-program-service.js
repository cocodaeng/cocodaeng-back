const getConnection = require("../../database/connection");
const MemberProgramRepository = require("../../repositories/member/member-program-repository");
const MemberProgramDTO = require("../../dto/member-program-dto");

// 펫 번호로 회원 진행 프로그램 전체 조회
exports.findMemberProgramByNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const result = await MemberProgramRepository.findMemberProgramByNo(
      connection,
      petNo
    );
    let memberPrograms = [];

    if (result !== null) {
      // 조회 성공 시
      for (let i = 0; i < result.length; i++) {
        memberPrograms[i] = new MemberProgramDTO({
          memberProgramNo: result[i].memberProgram_no,
          programNo: result[i].program_no,
          petNo: result[i].pet_no,
          memberStartDate: result[i].member_start_date,
          memberEndDate: result[i].member_end_date,
          programSevenDate: result[i].program_seven_date,
          programFourteenthDate: result[i].program_fourteenth_date,
          programTwentyoneDate: result[i].program_twentyone_date,
          programResult: result[i].program_result,
        });
      }
      resolve(memberPrograms);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("회원 진행 프로그램 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};
