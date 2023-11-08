const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const AllergyRepository = require("../../repositories/allergy/allergy-repository");

/* 알러지 유발 식재료 전체 조회 - 김종완 */
exports.findAllAllergies = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await AllergyRepository.findAllAllergies(connection);
      if (result) {
        // 조회 성공 시
        resolve(result);
      }
      if (!result) {
        const error = new Error("알러지 유발 식재료 조회에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 조회 중 에러 발생 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};
