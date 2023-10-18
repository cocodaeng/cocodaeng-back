/* 펫 서비스 */
const getConnection = require("../../database/connection");
const PetRepository = require("../../repositories/pet/pet-repository");
const PetDTO = require("../../dto/pet-dto");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPet = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    const result = await PetRepository.findPetByNo(connection, memberNo);

    if (result !== null) {
      // 조회 성공 시
      resolve(result);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("회원 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};

exports.createPet = (petDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await PetRepository.createPet(connection, petDTO);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
