const PolicyQuery = require("../../database/member/policy-query");

exports.findPolicyConsent = (connection, memberNo) => {
  return new Promise((resolve, reject) => {
    console.log("findPolicyConsent 여긴 레포지토리");
    connection.query(
      PolicyQuery.findPolicyConsent(memberNo),
      [memberNo],
      (err, result) => {
        if (err) {
          console.error("findPolicyConsent 에러 발생");
          reject(err);
        }
        if (result.length === 0) {
          console.log("asdfafsdf");
          // err = new Error("일치하는 회원이 없습니다.");
          // reject(err);
          resolve(null);
        }

        console.log("레포지토리 result", result);
        resolve(result);
      }
    );
  });
};

exports.updatePolicyConsent = (connection, policyUpdateRequestDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PolicyQuery.updatePolicyConsent(),
      [policyUpdateRequestDTO.memberNo, policyUpdateRequestDTO.PolicyConsent],
      (error, result) => {
        if (error) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
