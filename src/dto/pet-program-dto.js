class PetProgramDTO {
  petProgramNo;
  programNo;
  petNo;
  programName;
  petStartDate;
  petEndDate;
  programSeventhDate;
  programFourteenthDate;
  programResult;

  constructor(data) {
    this.petProgramNo = data.petProgramNo;
    this.programNo = data.programNo;
    this.petNo = data.petNo;
    this.programName = data.programName;
    this.petStartDate = data.petStartDate;
    this.petEndDate = data.petEndDate;
    this.programSeventhDate = data.programSeventhDate;
    this.programFourteenthDate = data.programFourteenthDate;
    this.programResult = data.programResult;
  }
}

module.exports = PetProgramDTO;
