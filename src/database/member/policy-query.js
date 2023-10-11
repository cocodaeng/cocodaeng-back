// 회원 번호로 이용 정책 동의 여부 조회
exports.findPolicyConsent = () => {
  return `
        SELECT policyConsent
          FROM TBL_MEMBER
         WHERE memberNo = ?
    `;
};

// 회원 번호와 이용 정책 동의 여부 업데이트
exports.updatePolicyConsent = () => {
  return `
      UPDATE TBL_MEMBER
         SET policyConsent =?
       WHERE memberNo =?
    `;
};
