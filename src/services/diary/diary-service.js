/* 다이어리 서비스 */
const getConnection = require("../../database/connection");
const DiaryRepository = require("../../repositories/diary/diary-repository");
const DiaryDTO = require("../../dto/diary-dto");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaryByNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const result = await DiaryRepository.findDiaryByNo(connection, petNo);
    let diaries = [];

    if (result !== null) {
      // 조회 성공 시
      for (let i = 0; i < result.length; i++) {
        diaries[i] = new DiaryDTO({
          diaryNo: result[i].diary_no,
          petNo: result[i].pet_no,
          petProgramNo: result[i].pet_program_no,
          diaryContent: result[i].diary_content,
          fodderName: result[i].fodder_name,
          createDate: result[i].create_date,
          petStatus: result[i].pet_status,
          diaryPhotoLeftEye: result[i].diary_photo_left_eye,
          diaryPhotoRightEye: result[i].diary_photo_right_eye,
          diaryPhotoLeftEar: result[i].diary_photo_left_ear,
          diaryPhotoRightEar: result[i].diary_photo_right_ear,
          diaryPhotoAnal: result[i].diary_photo_anal,
          diaryPhotoEtc: result[i].diary_photo_etc,
          updateDate: result[i].update_date,
          deleteDate: result[i].delete_date,
          deleteStatus: result[i].delete_status,
        });
      }
      resolve(diaries);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("다이어리 전체 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};
