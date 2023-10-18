/* 펫 레포지토리 */
const PetQuery = require("../../database/pet/pet-query");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
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

exports.createPet = (connection, petDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PetQuery.createPet(),
      [
        petDTO.memberNo,
        petDTO.breadNo,
        petDTO.petName,
        petDTO.petProfilePicture,
        petDTO.petWeight,
        petDTO.createDate,
        petDTO.petStatus,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
