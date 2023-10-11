// 회원 번호로 이용 정책 동의 여부 조회
exports.findPolicyConsent = () => {
  return `
        SELECT policy_consent
          FROM TBL_MEMBER
         WHERE member_no = ?
    `;
};

// 회원 번호와 이용 정책 동의 여부 업데이트
exports.updatePolicyConsent = () => {
  return `
      UPDATE TBL_MEMBER
         SET policy_consent =?
       WHERE member_no =?
    `;
};
