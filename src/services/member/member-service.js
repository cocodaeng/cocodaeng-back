const getConnection = require("../../database/connection");
const MemberRepository = require("../../repositories/member/member-repository");
const MemberDTO = require("../../dto/member-dto");

// 회원 번호로 회원 조회
exports.findMemberByNo = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    const result = await MemberRepository.findMemberByNo(connection, memberNo);

    if (result !== null) {
      // 조회 성공 시
      const member = new MemberDTO({
        memberNo: result[0].member_no,
        memberName: result[0].member_name,
        kakaoId: result[0].kakao_id,
        appleId: result[0].apple_id,
        photoAgreeStatus: result[0].photo_agree_status,
        policyConsent: result[0].policy_consent,
        createDate: result[0].create_date,
        updateDate: result[0].update_date,
        leaveDate: result[0].leave_date,
        leaveStatus: result[0].leave_status,
      });
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

// 카카오 아이디로 회원 조회
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

// 회원 등록
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
