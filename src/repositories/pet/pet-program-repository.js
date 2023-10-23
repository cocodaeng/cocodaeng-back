/* 펫 진행 프로그램 레포지토리 */
const PetProgramQuery = require("../../database/pet/pet-program-query");

/* 특정 펫 진행 프로그램 전체 조회 - 조만제 */
exports.findPetProgramsByPetNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PetProgramQuery.findPetProgramsByPetNo(),
      [petNo],
      (err, result) => {
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};
