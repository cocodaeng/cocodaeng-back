const PetProgramService = require("../../services/pet/pet-program-service");
const HttpStatus = require("http-status");

// 특정 펫 진행 프로그램 전체 조회
exports.findPetPrograms = async (req, res) => {
  const result = await PetProgramService.findPetProgramByNo(1);
  let pet_programs = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      pet_programs[i] = {
        pet_program_no: result[i].petProgramNo,
        program_no: result[i].programNo,
        pet_no: result[i].petNo,
        program_name: result[i].programName,
        pet_start_date: result[i].petStartDate,
        pet_end_date: result[i].petEndDate,
        program_seventh_date: result[i].programSeventhDate,
        program_fourteenth_date: result[i].programFourteenthDate,
        program_result: result[i].programResult,
      };
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "특정 펫 진행 프로그램 전체 조회 성공",
      pet_programs: pet_programs,
    });
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "특정 펫 진행 프로그램 전체 조회 실패",
      code: -999999,
      links: [
        {
          // rel: "",
          // method: "POST",
          // href: "",
        },
      ],
    });
  }
};
