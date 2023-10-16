const getConnection = require("../../database/connection");
const PetProgramRepository = require("../../repositories/pet/pet-program-repository");
const PetProgramDTO = require("../../dto/pet-program-dto");

// 특정 펫 진행 프로그램 전체 조회
exports.findPetProgramByNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const result = await PetProgramRepository.findPetProgramByNo(
      connection,
      petNo
    );
    let petPrograms = [];

    if (result !== null) {
      // 조회 성공 시
      for (let i = 0; i < result.length; i++) {
        petPrograms[i] = new PetProgramDTO({
          petProgramNo: result[i].pet_program_no,
          programNo: result[i].program_no,
          petNo: result[i].pet_no,
          programName: result[i].program_name,
          petStartDate: result[i].pet_start_date,
          petEndDate: result[i].pet_end_date,
          programSeventhDate: result[i].program_seventh_date,
          programFourteenthDate: result[i].program_fourteenth_date,
          programResult: result[i].program_result,
        });
      }
      resolve(petPrograms);
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
