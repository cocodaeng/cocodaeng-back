/* 회원 레포지토리 */
const MemberQuery = require("../../database/member/member-query");

/* 회원 번호로 회원 조회 메소드 - 조만제 */
exports.findMemberByMemberNo = (connection, memberNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MemberQuery.findMemberByMemberNo(),
      [memberNo],
      (err, result) => {
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};

/* 카카오 아이디로 회원 조회 메소드 - 조만제 */
exports.findMemberByKakaoId = (connection, kakaoId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MemberQuery.findMemberByKakaoId(),
      [kakaoId],
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

/* 회원 가입 메소드 - 조만제 */
exports.registMember = (connection, member) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MemberQuery.registMember(),
      [member.name, member.id],
      (err, result) => {
        if (err) {
          reject(err);
        }
        console.log("repo result : ", result);

        resolve(result);
      }
    );
  });
};
