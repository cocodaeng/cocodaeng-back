/* 다이어리 서비스 */
const getConnection = require("../../database/connection");
const DiaryRepository = require("../../repositories/diary/diary-repository");
const DiaryDTO = require("../../dto/diary-dto");

/* 다이어리 전체 조회 메소드 - 조만제, 김종완 */
exports.findDiariesByPetNo = (petNo, next) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await DiaryRepository.findDiariesByPetNo(
        connection,
        petNo
      );
      // 조회 성공 시
      resolve(result);
    } catch (err) {
      // 조회 실패 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 다이어리 번호로 다이어리 조회 - 김종완 */
exports.findDiaryByDiaryNo = (diaryNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await DiaryRepository.findDiaryByDiaryNo(
        connection,
        diaryNo
      );
      // 조회 성공 시, 빈 결과일 시
      resolve(result);
    } catch (err) {
      // 조회 실패 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 다이어리 신규 등록 - 김종완 */
exports.createDiary = (diaryDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await DiaryRepository.createDiary(connection, diaryDTO);
      // 등록 성공 시 or 등록 반영 실패 시
      connection.commit();
      resolve(result);
    } catch (err) {
      // 과정 중 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 다이어리 수정 - 김종완 */
exports.updateDiary = (diaryDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await DiaryRepository.updateDiary(connection, diaryDTO);
      // 수정 성공 시 or 수정 DB 반영 실패 시
      connection.commit();
      resolve(result);
    } catch (err) {
      // 조회 간 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 다이어리 삭제(상태 값 변경) - 김종완 */
exports.deleteDiary = (diaryNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await DiaryRepository.deleteDiary(connection, diaryNo);
      // 삭제 성공 시 or 삭제 상태 변경 실패 시
      connection.commit();
      resolve(result);
    } catch (err) {
      // 과정 중 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
