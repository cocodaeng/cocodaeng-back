/* 애플 레포지토리 */
const MemberQuery = require("../../database/member/member-query");

/* 애플 로그인 정보 삽입 - 김종완 */
exports.registAppleMember = (connection, id, username, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MemberQuery.registMember(),
      [username, id],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          reject(err);
        }
        // 등록 성공 시
        resolve(result);
      }
    );
  });
};
