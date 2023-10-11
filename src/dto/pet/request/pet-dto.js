class PetDTO {
  memberNo;
  breadNo;
  petName;
  petProfilePicture;
  petAge;
  petWeight;
  createDate;
  petStatus;

  constructor(
    memberNo,
    breadNo,
    petName,
    petProfilePicture,
    petAge,
    petWeight,
    createDate,
    petStatus
  ) {
    this.memberNo = memberNo;
    this.breadNo = breadNo;
    this.petName = petName;
    this.petProfilePicture = petProfilePicture;
    this.petAge = petAge;
    this.petWeight = petWeight;
    this.createDate = createDate;
    this.petStatus = petStatus;
  }
}
module.exports = PetDTO;
