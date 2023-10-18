/* 다이어리 레포지토리 */
const DiaryQuery = require("../../database/diary/diary-query");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiariesByPetNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.findDiariesByPetNo(),
      [petNo],
      (err, result) => {
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};

// 다이어리 단일 조회
exports.findDiaryByDiaryNo = (connection, diaryNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.findDiaryByDiaryNo(),
      [diaryNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        resolve(result);
      }
    );
  });
};

// 다이어리 생성 - 김종완
exports.createDiary = (connection, diaryDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.createDiary(),
      [
        diaryDTO.petNo,
        diaryDTO.petProgramNo,
        diaryDTO.diaryContent,
        diaryDTO.fodderName,
        diaryDTO.petStatus,
        diaryDTO.diaryPhotoLeftEye,
        diaryDTO.diaryPhotoRightEye,
        diaryDTO.diaryPhotoLeftEar,
        diaryDTO.diaryPhotoRightEar,
        diaryDTO.diaryPhotoAnal,
        diaryDTO.diaryPhotoEtc,
        diaryDTO.createDate,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

// 다이어리 수정 - 김종완
exports.updateDiary = (connection, diaryDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.updateDiary(),
      [
        diaryDTO.petNo,
        diaryDTO.petProgramNo,
        diaryDTO.diaryContent,
        diaryDTO.fodderName,
        diaryDTO.petStatus,
        diaryDTO.diaryPhotoLeftEye,
        diaryDTO.diaryPhotoRightEye,
        diaryDTO.diaryPhotoLeftEar,
        diaryDTO.diaryPhotoRightEar,
        diaryDTO.diaryPhotoAnal,
        diaryDTO.diaryPhotoEtc,
        diaryDTO.updateDate,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

// 다이어리 삭제 - 김종완
exports.deleteDiary = (connection, diaryNo) => {
  return new Promise((resolve, reject) => {
    connection.query(DiaryQuery.deleteDiary(), [diaryNo, 1], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
