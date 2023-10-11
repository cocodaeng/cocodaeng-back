class policyUpdateRequestDTO {
  memberNo;
  policyConsent;

  constructor(memberNo, policyConsent) {
    this.memberNo = memberNo;
    this.policyConsent = policyConsent;
  }

  setMemberNo(memberNo) {
    this.memberNo = memberNo;
  }

  setPolicyConsent(policyConsent) {
    this.policyConsent = policyConsent;
  }
}
