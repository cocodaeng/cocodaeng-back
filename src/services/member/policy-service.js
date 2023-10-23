const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const PolicyRepository = require("../../repositories/member/policy-repository");

/* 이용 정책 동의 유효성 검증 - 김종완 */
exports.checkValidPolicyConsent = (policyConset) => {
  const regex = /^[012]$/;
  return new Promise((resolve, reject) => {
    if (regex.test(policyConset)) {
      resolve(policyConset);
    }
    if (!regex.test(policyConset)) {
      const error = new Error("0, 1, 2 외의 숫자는 허용되지 않습니다.");
      error.status = HttpStatus.BAD_REQUEST;
      reject(error);
    }
  });
};

/* 회원 번호로 이용 정책 동의 여부 조회 - 김종완 */
exports.findPolicyConsent = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    try {
      const result = await PolicyRepository.findPolicyConsent(
        connection,
        memberNo
      );
      console.log("service단 findPolicyConsent result: ", result);
      if (result) {
        resolve(result);
      }
      if (!result) {
        const error = new Error("이용 정책 동의 여부 조회에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 회원 번호로 이용 정책 동의 여부 업데이트 - 김종완 */
exports.updatePolicyConsent = (policyUpdateRequestDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    console.log("updatePolicyConsent result: ", policyUpdateRequestDTO);
    try {
      const result = await PolicyRepository.updatePolicyConsent(
        connection,
        policyUpdateRequestDTO
      );
      // 수정 성공 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      // 수정 사항 DB 반영 실패 시
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error(
          "이용 정책 동의 여부 업데이트에 실패하였습니다."
        );
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
