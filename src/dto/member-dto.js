class MemberDTO {
  memberNo;
  memberName;
  kakaoId;
  appleId;
  photoAgreeStatus;
  policyConsent;
  createDate;
  updateDate;
  leaveDate;
  leaveStatus;

  constructor(data) {
    this.memberNo = data.memberNo;
    this.memberName = data.memberName;
    this.kakaoId = data.kakaoId;
    this.appleId = data.appleId;
    this.photoAgreeStatus = data.photoAgreeStatus;
    this.policyConsent = data.policyConsent;
    this.createDate = data.createDate;
    this.updateDate = data.updateDate;
    this.leaveDate = data.leaveDate;
    this.leaveStatus = data.leaveStatus;
  }
}

module.exports = MemberDTO;
