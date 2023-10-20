const getConnection = require("../../database/connection");
const AllergyRepository = require("../../repositories/allergy/allergy-repository");

/* 알러지 유발 식재료 전체 조회 - 김종완 */
exports.findAllAllergies = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await AllergyRepository.findAllAllergies(connection);
      // 조회 성공 시
      resolve(result);
    } catch (err) {
      // 조회 중 에러 발생 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};
