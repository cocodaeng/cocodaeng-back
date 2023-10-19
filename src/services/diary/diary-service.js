/* 다이어리 서비스 */
const getConnection = require("../../database/connection");
const DiaryRepository = require("../../repositories/diary/diary-repository");
const DiaryDTO = require("../../dto/diary-dto");
const HttpStatus = require("http-status");

// 조회 실패 메세지
const failMessage = "잘못된 요청입니다.";

/* 다이어리 전체 조회 메소드 - 조만제, 김종완 */
exports.findDiariesByPetNo = (petNo, next) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await DiaryRepository.findDiariesByPetNo(
        connection,
        petNo
      );
      if (result) {
        // 조회 성공 시
        resolve(result);
      }
      if (!result) {
        // 조회 실패 시
        const error = new Error(failMessage);
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 에러 발생 시
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

      // 조회 성공 시
      if (result) {
        resolve(result);
      }

      // 조회 실패 시
      if (!result) {
        const error = new Error(failMessage);
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 에러 발생 시
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
      // 등록 성공 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      // 등록 반영 실패 시(요청 변수가 잘못되었을 때)
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error("등록에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
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
      // 수정 성공 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      // 수정 DB 반영 실패 시
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error(failMessage);
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
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
      // 삭제 성공 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      console.log("asdfasdf", result.affectedRows);
      // 삭제 실패 시
      if (result.affectedRows === 0) {
        console.log("asdasdfasdfasdff");
        connection.rollback();
        const error = new Error(failMessage);
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 과정 중 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
