/* 식재료 탐험 페이지 서비스 */
const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const FoodExplorationRepository = require("../../repositories/main/food-exploration-repository");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await FoodExplorationRepository.findPetJoinProgram(
        connection,
        petNo
      );
      // 조회 성공 시
      if (result) {
        resolve(result);
        connection.commit();
      }
      // 조회 실패 시
      if (!result) {
        connection.rollback();
        const error = new Error("조회 실패");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 기참여 프로그램 조회하는 메소드 - 조만제 */
exports.findParticipationProgram = (petNo, programNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await FoodExplorationRepository.findParticipationProgram(
        connection,
        petNo,
        programNo
      );
      // 조회 성공 시
      if (result) {
        resolve(result);
        connection.commit();
      }
      // 조회 실패 시
      if (!result) {
        connection.rollback();
        const error = new Error("조회 실패");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};
