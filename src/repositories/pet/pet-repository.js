/* 펫 레포지토리 */
const PetQuery = require("../../database/pet/pet-query");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPetsByMemberNo = (connection, memberNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PetQuery.findPetsByMemberNo(),
      [memberNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        resolve(result);
      }
    );
  });
};

/* 펫 번호로 펫 조회하는 메소드 - 김종완 */
exports.findPetByPetNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(PetQuery.findPetByPetNo(), [petNo], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.length === 0) {
        resolve(null);
      }
      resolve(result);
    });
  });
};

/* 신규 펫 등록 메소드 - 김종완 */
exports.createPet = (connection, petDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PetQuery.createPet(),
      [
        petDTO.memberNo,
        petDTO.breadNo,
        petDTO.petName,
        petDTO.petProfilePicture,
        petDTO.petAge,
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

/* 펫 등록 후 알러지 정보 삽입 - 김종완 */
exports.createAllergies = (connection, allergyDTO) => {
  return new Promise((resolve, reject) => {
    let values = allergyDTO.allergyIngredientNoList.map((item) => [
      allergyDTO.petNo,
      item,
    ]);
    connection.query(PetQuery.createAllergies(), [values], (err, result) => {
      // DB 에러 발생 시
      if (err) {
        reject(err);
      }
      // 등록 성공 시
      resolve(result);
    });
  });
};
