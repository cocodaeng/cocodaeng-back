/* 펫 진행 프로그램 서비스 */
const getConnection = require("../../database/connection");
const PetProgramRepository = require("../../repositories/pet/pet-program-repository");
const PetProgramDTO = require("../../dto/pet-program-dto");

/* 특정 펫 진행 프로그램 전체 조회 - 조만제 */
exports.findPetProgramByNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const result = await PetProgramRepository.findPetProgramByNo(
      connection,
      petNo
    );

    if (result !== null) {
      // 조회 성공 시
      resolve(result);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("특정 펫 진행 프로그램 전체 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};
