const PetProgramQuery = require("../../database/pet/pet-program-query");

// 특정 펫 진행 프로그램 전체 조회
exports.findPetProgramByNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PetProgramQuery.findPetProgramByNo(),
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
