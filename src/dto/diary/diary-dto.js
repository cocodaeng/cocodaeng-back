class DiaryDTO {
  diaryNo;
  petNo;
  petProgramNo;
  diaryContent;
  fodderName;
  petStatus;
  diaryPhotoLeftEye;
  diaryPhotoRightEye;
  diaryPhotoLeftEar;
  diaryPhotoRightEar;
  diaryPhotoAnal;
  diaryPhotoEtc;
  createDate;
  updateDate;
  deleteStatus;

  constructor(
    diaryNo,
    petNo,
    petProgramNo,
    diaryContent,
    fodderName,
    petStatus,
    diaryPhotoLeftEye,
    diaryPhotoRightEye,
    diaryPhotoLeftEar,
    diaryPhotoRightEar,
    diaryPhotoAnal,
    diaryPhotoEtc,
    createDate,
    updateDate,
    deleteStatus
  ) {
    this.diaryNo = diaryNo;
    this.petNo = petNo;
    this.petProgramNo = petProgramNo;
    this.diaryContent = diaryContent;
    this.fodderName = fodderName;
    this.petStatus = petStatus;
    this.diaryPhotoLeftEye = diaryPhotoLeftEye;
    this.diaryPhotoRightEye = diaryPhotoRightEye;
    this.diaryPhotoLeftEar = diaryPhotoLeftEar;
    this.diaryPhotoRightEar = diaryPhotoRightEar;
    this.diaryPhotoAnal = diaryPhotoAnal;
    this.diaryPhotoEtc = diaryPhotoEtc;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.deleteStatus = deleteStatus;
  }

  static fromCreateDiary = (
    diaryNo,
    petNo,
    petProgramNo,
    diaryContent,
    fodderName,
    petStatus,
    diaryPhotoLeftEye,
    diaryPhotoRightEye,
    diaryPhotoLeftEar,
    diaryPhotoRightEar,
    diaryPhotoAnal,
    diaryPhotoEtc
  ) => {
    return new DiaryDTO(
      diaryNo,
      petNo,
      petProgramNo,
      diaryContent,
      fodderName,
      petStatus,
      diaryPhotoLeftEye,
      diaryPhotoRightEye,
      diaryPhotoLeftEar,
      diaryPhotoRightEar,
      diaryPhotoAnal,
      diaryPhotoEtc,
      new Date(),
      null,
      null
    );
  };

  static fromUpdateDiary = (
    diaryNo,
    petNo,
    petProgramNo,
    diaryContent,
    fodderName,
    petStatus,
    diaryPhotoLeftEye,
    diaryPhotoRightEye,
    diaryPhotoLeftEar,
    diaryPhotoRightEar,
    diaryPhotoAnal,
    diaryPhotoEtc,
    createDate,
    deleteStatus
  ) => {
    return new DiaryDTO(
      diaryNo,
      petNo,
      petProgramNo,
      diaryContent,
      fodderName,
      petStatus,
      diaryPhotoLeftEye,
      diaryPhotoRightEye,
      diaryPhotoLeftEar,
      diaryPhotoRightEar,
      diaryPhotoAnal,
      diaryPhotoEtc,
      createDate,
      new Date(),
      deleteStatus
    );
  };
}
module.exports = DiaryDTO;
