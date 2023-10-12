const PetQuery = require("../../database/pet/pet-query");

// 회원 번호로 펫 조회
exports.findPetByNo = (connection, memberNo) => {
  return new Promise((resolve, reject) => {
    connection.query(PetQuery.findPetByNo(), [memberNo], (err, result) => {
      if (err) {
        console.log("error: " + err);
        reject(err);
      }
      console.log(result);
      resolve(result);
    });
  });
};
