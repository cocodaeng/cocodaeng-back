class ResultDTO {
  petProgramNo;
  petNo;
  programNo;
  programResult;

  constructor(petProgramNo, petNo, programNo, programResult) {
    this.petProgramNo = petProgramNo;
    this.petNo = petNo;
    this.programNo = programNo;
    this.programResult = programResult;
  }

  static findResult = (petNo, programNo) => {
    return new ResultDTO(null, petNo, programNo, null);
  };

  static updateResult = (petProgramNo, programResult) => {
    return new ResultDTO(petProgramNo, null, null, programResult);
  };
}
module.exports = ResultDTO;
