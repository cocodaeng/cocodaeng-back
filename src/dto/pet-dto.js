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

  constructor(data) {
    this.petNo = data.petNo;
    this.memberNo = data.memberNo;
    this.breadNo = data.breadNo;
    this.petName = data.petName;
    this.petProfilePicture = data.petProfilePicture;
    this.petAge = data.petAge;
    this.petWeight = data.petWeight;
    this.createDate = new Date(data.createDate);
    this.petStatus = data.petStatus;
  }
}

module.exports = PetDTO;
