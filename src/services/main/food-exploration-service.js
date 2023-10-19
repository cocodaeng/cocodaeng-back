/* 식재료 탐험 페이지 서비스 */
const getConnection = require("../../database/connection");
const FoodExplorationRepository = require("../../repositories/main/food-exploration-repository");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    const result = await FoodExplorationRepository.findPetJoinProgram(
      connection,
      petNo
    );

    // 조회 성공 시
    if (result !== null) {
      resolve(result);
      connection.commit();
    }

    // 조회 실패 시
    if (result === null) {
      reject(new Error("회원 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};
