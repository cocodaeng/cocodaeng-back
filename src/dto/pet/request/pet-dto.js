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
    petStatus
  ) {
    this.memberNo = memberNo;
    this.breadNo = breadNo;
    this.petName = petName;
    this.petProfilePicture = petProfilePicture;
    this.petAge = petAge;
    this.petWeight = petWeight;
    this.createDate = new Date().getDate();
    this.petStatus = petStatus;
  }
}
module.exports = PetDTO;
