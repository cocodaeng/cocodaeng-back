/* 결과 레포지토리 */
const ResultQuery = require("../../database/result/result-query");

/* 최종 결과(시작일 - 종료일) 조회 - 김종완*/
exports.findFinalResult = (connection, resultDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      ResultQuery.findFinalResult(),
      [resultDTO.petNo, resultDTO.programNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          reject(err);
        }
        // 빈 결과 조회 시
        if (result.length === 0) {
          resolve(null);
        }
        // 정상 조회 시
        resolve(result);
      }
    );
  });
};

/* 최종 결과 전체 기록 조회 - 김종완 */
exports.findAllResults = (connection, resultDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      ResultQuery.findAllResults(),
      [resultDTO.petNo, resultDTO.programNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          reject(err);
        }
        // 빈 결과 조회 시
        if (result.length === 0) {
          resolve(null);
        }
        // 정상 조회 시
        resolve(result);
      }
    );
  });
};

/* 최종 결과 업데이트 - 김종완 */
exports.updateResult = (connection, resultDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      ResultQuery.updateResult(),
      [resultDTO.programResult, resultDTO.petProgramNo],
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
