/* 회원 번호로 이용 정책 동의 여부 조회 - 김종완 */
exports.findPolicyConsent = () => {
  return `
        SELECT policy_consent
          FROM TBL_MEMBER
         WHERE MEM_member_no = ?
    `;
};

/* 회원 번호로 이용 정책 동의 여부 조회 - 김종완 */
exports.updatePolicyConsent = () => {
  return `
      UPDATE TBL_MEMBER
         SET policy_consent =?
       WHERE MEM_member_no =?
    `;
};
