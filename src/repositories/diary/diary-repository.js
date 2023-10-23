/* 다이어리 레포지토리 */
const DiaryQuery = require("../../database/diary/diary-query");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiariesByPetNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.findDiariesByPetNo(),
      [petNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        // 빈 결과 조회
        if (result.length === 0) {
          resolve(null);
        }
        // 정상 조회 시
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};

/* 다이어리 번호로 다이어리 조회 - 김종완 */
exports.findDiaryByDiaryNo = (connection, diaryNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.findDiaryByDiaryNo(),
      [diaryNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          reject(err);
        }
        // 빈 결과일 시
        if (result.length === 0) {
          resolve(null);
        }
        // 정상 조회일 시
        resolve(result);
      }
    );
  });
};

/* 다이어리 신규 등록 - 김종완 */
exports.createDiary = (connection, diaryDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.createDiary(),
      [
        diaryDTO.petNo,
        diaryDTO.petProgramNo,
        diaryDTO.diaryContent,
        diaryDTO.fodderName,
        diaryDTO.petHealth,
        diaryDTO.diaryPhotoLeftEye,
        diaryDTO.diaryPhotoRightEye,
        diaryDTO.diaryPhotoLeftEar,
        diaryDTO.diaryPhotoRightEar,
        diaryDTO.diaryPhotoAnal,
        diaryDTO.diaryPhotoEtc,
        diaryDTO.createDate,
      ],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          reject(err);
        }
        // 등록 성공 시
        resolve(result);
      }
    );
  });
};

/* 다이어리 수정 - 김종완 */
exports.updateDiary = (connection, diaryDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      DiaryQuery.updateDiary(),
      [
        diaryDTO.petNo,
        diaryDTO.petProgramNo,
        diaryDTO.diaryContent,
        diaryDTO.fodderName,
        diaryDTO.petHealth,
        diaryDTO.diaryPhotoLeftEye,
        diaryDTO.diaryPhotoRightEye,
        diaryDTO.diaryPhotoLeftEar,
        diaryDTO.diaryPhotoRightEar,
        diaryDTO.diaryPhotoAnal,
        diaryDTO.diaryPhotoEtc,
        diaryDTO.updateDate,
        diaryDTO.diaryNo,
      ],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          reject(err);
        }
        // 수정 성공 시
        resolve(result);
      }
    );
  });
};

/* 다이어리 삭제(상태 값 변경) - 김종완 */
exports.deleteDiary = (connection, diaryNo) => {
  return new Promise((resolve, reject) => {
    connection.query(DiaryQuery.deleteDiary(), [0, diaryNo], (err, result) => {
      // 에러 발생 시
      if (err) {
        reject(err);
      }
      // 삭제 성공 시
      resolve(result);
    });
  });
};
