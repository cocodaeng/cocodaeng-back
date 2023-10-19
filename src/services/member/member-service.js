/* 회원 서비스 */
const getConnection = require("../../database/connection");
const MemberRepository = require("../../repositories/member/member-repository");
const MemberDTO = require("../../dto/member-dto");

/* 회원 번호로 회원 조회 메소드 - 조만제 */
exports.findMemberByMemberNo = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await MemberRepository.findMemberByMemberNo(
        connection,
        memberNo
      );
      // 조회 성공 시
      resolve(result);
    } catch (err) {
      // 조회 실패 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 카카오 아이디로 회원 조회 메소드 - 조만제 */
exports.findMemberByKakaoId = (kakaoId) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    const result = await MemberRepository.findMemberByKakaoId(
      connection,
      kakaoId
    );

    if (result !== null) {
      // 조회 성공 시
      const member = new MemberDTO(
        result.userNo,
        result.userName,
        result.kakaoId,
        result.appleId,
        result.photoAgreeStatus,
        result.policyConsent,
        result.createDate,
        result.updateDate,
        leaveDate,
        leaveStatus
      );
      resolve(member);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("회원 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};

/* 회원 가입 메소드 - 조만제 */
exports.registMember = (member) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    connection.beginTransaction();

    try {
      // 카카오 아이디로 회원 있는지 조회
      const findMember = await MemberRepository.findMemberByKakaoId(
        connection,
        member.kakaoId
      );
      console.log(findMember);

      // 아이디 중복된 회원 없으면 회원가입
      if (findMember.length === 0) {
        const result = await MemberRepository.registMember(connection, member); // promise
        console.log("result : ", result.insertId);

        const insertedMember = await MemberRepository.findMemberByKakaoId(
          connection,
          result.insertId
        );
        console.log("insertedMember : ", insertedMember);

        connection.commit();
        console.log("commit successfully");
        resolve(insertedMember);
      }
      resolve(null);
    } catch (err) {
      connection.rollback();
      console.error("rollback successfully");

      reject(err);
    } finally {
      connection.end;
      console.log("connection is closed successfully");
    }
  });
};
