const getConnection = require("../../database/connection");
const DiaryRepository = require("../../repositories/diary/diary-repository");
const DiaryDTO = require("../../dto/diary-dto");

// 다이어리 전체 조회
exports.findDiariesByPetNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const result = await DiaryRepository.findDiariesByPetNo(connection, petNo);
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

// 다이어리 단일 조회 - 김종완
exports.findDiaryByDiaryNo = (diaryNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await DiaryRepository.findDiaryByDiaryNo(
        connection,
        diaryNo
      );
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

// 다이어리 생성 - 김종완
exports.createDiary = (diaryDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await DiaryRepository.createDiary(connection, diaryDTO);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

// 다이어리 수정 - 김종완
exports.updateDiary = (diaryDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await DiaryRepository.updateDiary(connection, diaryDTO);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

// 다이어리 삭제 - 김종완
exports.deleteDiary = (diaryNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await DiaryRepository.deleteDiary(connection, diaryNo);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
