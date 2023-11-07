/* 결과 서비스 */
const getConnection = require("../../database/connection");
const ResultRepository = require("../../repositories/result/result-repository");
const HttpStatus = require("http-status");

/* 최종 결과(시작일 - 종료일) 조회 - 김종완*/
exports.findFinalResult = (resultDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await ResultRepository.findFinalResult(
        connection,
        resultDTO
      );

      // 조회 성공 시
      if (result) {
        resolve(result);
      }
      // 조회 실패 시
      if (!result) {
        const error = new Error("잘못된 요청입니다.");
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

/* 최종 결과 전체 기록 조회 - 김종완 */
exports.findAllResults = (resultDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await ResultRepository.findAllResults(
        connection,
        resultDTO
      );

      // 조회 성공 시
      if (result) {
        resolve(result);
      }
      // 조회 실패 시
      if (!result) {
        const error = new Error("잘못된 요청입니다.");
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

/* 최종 결과 업데이트 - 김종완 */
exports.updateResult = (resultDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await ResultRepository.updateResult(connection, resultDTO);
      // 수정 성공 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      // 수정 반영 실패 시
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error("잘못된 요청입니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
