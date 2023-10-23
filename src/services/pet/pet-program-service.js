/* 펫 진행 프로그램 서비스 */
const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const PetProgramRepository = require("../../repositories/pet/pet-program-repository");
const PetProgramDTO = require("../../dto/pet-program-dto");

/* 특정 펫 진행 프로그램 전체 조회 - 조만제 */
exports.findPetProgramsByPetNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await PetProgramRepository.findPetProgramsByPetNo(
        connection,
        petNo
      );

      if (result) {
        // 조회 성공 시
        resolve(result);
      }
      if (!result) {
        // 조회 실패 시
        const error = new Error(
          "특정 펫 진행 프로그램 전체 조회에 실패하였습니다."
        );
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};
