const AllergyQuery = require("../../database/allergy/allergy-query");

/* 알러지 유발 식재료 전체 조회 - 김종완 */
exports.findAllAllergies = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(AllergyQuery.findAllAllergies(), [], (err, result) => {
      // DB 에러 발생 시
      if (err) {
        reject(err);
      }
      // 조회 실패 시(빈 결과 조회 시)
      if (result.length === 0) {
        resolve(null);
      }
      // 조회 성공 시
      resolve(result);
    });
  });
};
