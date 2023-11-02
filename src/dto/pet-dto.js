class PetDTO {
  petNo;
  memberNo;
  breadNo;
  petName;
  petProfilePicture;
  petAge;
  petWeight;
  createDate;
  petStatus;

  constructor(
    petNo,
    memberNo,
    breadNo,
    petName,
    petProfilePicture,
    petAge,
    petWeight,
    createDate,
    petStatus
  ) {
    this.petNo = petNo;
    this.memberNo = memberNo;
    this.breadNo = breadNo;
    this.petName = petName;
    this.petProfilePicture = petProfilePicture;
    this.petAge = petAge;
    this.petWeight = petWeight;
    this.createDate = createDate;
    this.petStatus = petStatus;
  }

  static fromCreatePet = (
    memberNo,
    breadNo,
    petName,
    petProfilePicture,
    petAge,
    petWeight
  ) => {
    return new PetDTO(
      null,
      memberNo,
      breadNo,
      petName,
      petProfilePicture,
      petAge,
      petWeight,
      new Date(),
      1
    );
  };
}

module.exports = PetDTO;
