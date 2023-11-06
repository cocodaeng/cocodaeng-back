class ResultDTO {
  petNo;
  programNo;
  programResult;

  constructor(petNo, programNo, programResult) {
    this.petNo = petNo;
    this.programNo = programNo;
    this.programResult = programResult;
  }
}
module.exports = ResultDTO;
