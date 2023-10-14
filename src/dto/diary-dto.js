class DiaryDTO {
  diaryNo;
  petNo;
  petProgramNo;
  diaryContent;
  fodderName;
  createDate;
  petStatus;
  diaryPhotoLeftEye;
  diaryPhotoRightEye;
  diaryPhotoLeftEar;
  diaryPhotoRightEar;
  diaryPhotoAnal;
  diaryPhotoEtc;
  updateDate;
  deleteDate;
  deleteStatus;

  constructor(data) {
    this.diaryNo = data.diaryNo;
    this.petNo = data.petNo;
    this.petProgramNo = data.petProgramNo;
    this.diaryContent = data.diaryContent;
    this.fodderName = data.fodderName;
    this.createDate = data.createDate;
    this.petStatus = data.petStatus;
    this.diaryPhotoLeftEye = data.diaryPhotoLeftEye;
    this.diaryPhotoRightEye = data.diaryPhotoRightEye;
    this.diaryPhotoLeftEar = data.diaryPhotoLeftEar;
    this.diaryPhotoRightEar = data.diaryPhotoRightEar;
    this.diaryPhotoAnal = data.diaryPhotoAnal;
    this.diaryPhotoEtc = data.diaryPhotoEtc;
    this.updateDate = data.updateDate;
    this.deleteDate = data.deleteDate;
    this.deleteStatus = data.deleteStatus;
  }
}

module.exports = DiaryDTO;
