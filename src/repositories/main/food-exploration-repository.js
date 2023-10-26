/* 식재료 탐험 페이지 레포지토리 */
const FoodExplorationQuery = require("../../database/main/food-exploration-query");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      FoodExplorationQuery.findPetJoinProgram(),
      [petNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        // 빈 결과 조회
        if (result.length === 0) {
          resolve(result);
        }
        // 정상 조회 시
        resolve(result);
      }
    );
  });
};

/* 기참여 프로그램 조회하는 메소드 - 조만제 */
exports.findParticipationProgram = (connection, petNo, programNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      FoodExplorationQuery.findParticipationProgram(),
      [petNo, programNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        // 빈 결과 조회
        if (result.length === 0) {
          resolve(result);
        }
        // 정상 조회 시
        resolve(result);
      }
    );
  });
};

/* 미참여 프로그램 조회하는 메소드 - 조만제 */
exports.findNonParticipationProgram = (connection, petNo, programNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      FoodExplorationQuery.findNonParticipationProgram(),
      [petNo, programNo],
      (err, result) => {
        // 에러 발생 시
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        // 빈 결과 조회
        if (result.length === 0) {
          resolve(result);
        }
        // 정상 조회 시
        resolve(result);
      }
    );
  });
};
