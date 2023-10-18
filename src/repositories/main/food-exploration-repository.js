/* 식재료 탐험 페이지 레포지토리 */
const FoodExplorationQuery = require("../../database/main/food-exploration-query");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      FoodExplorationQuery.findPetJoinProgram(),
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
