class MemberProgramDTO {
  memberProgramNo;
  programNo;
  petNo;
  memberStartDate;
  memberEndDate;
  programSevenDate;
  programFourteenthDate;
  programTwentyoneDate;
  programResult;

  constructor(data) {
    this.memberProgramNo = data.memberProgramNo;
    this.programNo = data.programNo;
    this.petNo = data.petNo;
    this.memberStartDate = data.memberStartDate;
    this.memberEndDate = data.memberEndDate;
    this.programSevenDate = data.programSevenDate;
    this.programFourteenthDate = data.programFourteenthDate;
    this.programTwentyoneDate = data.programTwentyoneDate;
    this.programResult = data.programResult;
  }
}

module.exports = MemberProgramDTO;
