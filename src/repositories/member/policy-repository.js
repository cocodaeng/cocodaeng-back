const PolicyQuery = require("../../database/member/policy-query");

/* 회원 번호로 이용 정책 동의 여부 조회 - 김종완 */
exports.findPolicyConsent = (connection, memberNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PolicyQuery.findPolicyConsent(),
      [memberNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        resolve(result);
      }
    );
  });
};

/* 회원 번호로 이용 정책 동의 여부 업데이트 - 김종완 */
exports.updatePolicyConsent = (connection, policyUpdateRequestDTO) => {
  return new Promise((resolve, reject) => {
    console.log(policyUpdateRequestDTO);
    connection.query(
      PolicyQuery.updatePolicyConsent(),
      [policyUpdateRequestDTO.memberNo, policyUpdateRequestDTO.policyConsent],
      (error, result) => {
        if (error) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
