const getConnection = require("../../database/connection");
const PolicyRepository = require("../../repositories/member/policy-repository");

// 이용 정책 동의 유효성 검증
exports.checkValidPolicyConsent = (policyConset) => {
  const regex = /^[012]$/;
  return new Promise((resolve, reject) => {
    if (regex.test(policyConset)) {
      resolve(policyConset);
    }
    reject(new Error("0, 1, 2 외의 숫자는 허용되지 않습니다."));
  });
};

// 회원 번호로 이용 정책 동의 여부 조회
exports.findPolicyConsent = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    console.log("findPolicyConsent PolicyService에 왔다.");
    const connection = getConnection();

    try {
      const result = await PolicyRepository.findPolicyConsent(
        connection,
        memberNo
      );
      console.log("service단 findPolicyConsent result: ", result);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

// 회
exports.updatePolicyConsent = (policyUpdateRequestDTO) => {
  return new Promise(async (resolve) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      const result = await PolicyRepository.updatePolicyConsent(
        connection,
        policyUpdateRequestDTO
      );
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
