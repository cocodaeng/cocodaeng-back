class DiaryDTO {
  diaryNo;
  petNo;
  petProgramNo;
  diaryContent;
  fodderName;
  petHealth;
  diaryPhotoLeftEye;
  diaryPhotoRightEye;
  diaryPhotoLeftEar;
  diaryPhotoRightEar;
  diaryPhotoAnal;
  diaryPhotoEtc;
  createDate;
  updateDate;
  diarytStatus;

  constructor(
    diaryNo,
    petNo,
    petProgramNo,
    diaryContent,
    fodderName,
    petHealth,
    diaryPhotoLeftEye,
    diaryPhotoRightEye,
    diaryPhotoLeftEar,
    diaryPhotoRightEar,
    diaryPhotoAnal,
    diaryPhotoEtc,
    createDate,
    updateDate,
    diarytStatus
  ) {
    this.diaryNo = diaryNo;
    this.petNo = petNo;
    this.petProgramNo = petProgramNo;
    this.diaryContent = diaryContent;
    this.fodderName = fodderName;
    this.petHealth = petHealth;
    this.diaryPhotoLeftEye = diaryPhotoLeftEye;
    this.diaryPhotoRightEye = diaryPhotoRightEye;
    this.diaryPhotoLeftEar = diaryPhotoLeftEar;
    this.diaryPhotoRightEar = diaryPhotoRightEar;
    this.diaryPhotoAnal = diaryPhotoAnal;
    this.diaryPhotoEtc = diaryPhotoEtc;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.diarytStatus = diarytStatus;
  }

  static fromCreateDiary = (
    diaryNo,
    petNo,
    petProgramNo,
    diaryContent,
    fodderName,
    petHealth,
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
      petHealth,
      diaryPhotoLeftEye,
      diaryPhotoRightEye,
      diaryPhotoLeftEar,
      diaryPhotoRightEar,
      diaryPhotoAnal,
      diaryPhotoEtc,
      new Date(),
      null,
      1
    );
  };

  static fromUpdateDiary = (
    diaryNo,
    petNo,
    petProgramNo,
    diaryContent,
    fodderName,
    petHealth,
    diaryPhotoLeftEye,
    diaryPhotoRightEye,
    diaryPhotoLeftEar,
    diaryPhotoRightEar,
    diaryPhotoAnal,
    diaryPhotoEtc,
    createDate,
    diarytStatus
  ) => {
    return new DiaryDTO(
      diaryNo,
      petNo,
      petProgramNo,
      diaryContent,
      fodderName,
      petHealth,
      diaryPhotoLeftEye,
      diaryPhotoRightEye,
      diaryPhotoLeftEar,
      diaryPhotoRightEar,
      diaryPhotoAnal,
      diaryPhotoEtc,
      createDate,
      new Date(),
      diarytStatus
    );
  };
}
module.exports = DiaryDTO;
