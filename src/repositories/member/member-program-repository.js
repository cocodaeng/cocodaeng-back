const MemberProgramQuery = require("../../database/member/member-program-query");

// 펫 번호로 회원 진행 프로그램 전체 조회
exports.findMemberProgramByNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MemberProgramQuery.findMemberProgramByNo(),
      [petNo],
      (err, result) => {
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};
