/* 펫 진행 프로그램 컨트롤러 */
const PetProgramService = require("../../services/pet/pet-program-service");
const HttpStatus = require("http-status");
const JwtDecode = require("../../utils/jwt-decoder");
const PetService = require("../../services/pet/pet-service");

/* 특정 펫 진행 프로그램 전체 조회 - 조만제 */
exports.findPetProgramsByPetNo = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecode.getMemberNoFromToken(token);
    const petNo = await PetService.findPetsByMemberNo(memberNo).then(
      (pet) => pet[0].pet_no
    );
    const result = await PetProgramService.findPetProgramsByPetNo(petNo);

    let pet_programs = [];

    for (let i = 0; i < result.length; i++) {
      pet_programs[i] = {
        pet_program_no: result[i].pet_program_no,
        program_no: result[i].program_no,
        pet_no: result[i].pet_no,
        program_name: result[i].program_name,
        pet_start_date: result[i].pet_start_date,
        pet_end_date: result[i].pet_end_date,
        pet_seventh_date: result[i].pet_seventh_date,
        pet_fourteenth_date: result[i].pet_fourteenth_date,
        program_result: result[i].program_result,
      };
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "특정 펫 진행 프로그램 전체 조회 성공",
      data: result,
    });
  } catch (err) {
    err.links = [
      {
        rel: "findPetProgramsByPetNo",
        method: "GET",
        href: "api/v1/pet/findPetPrograms",
      },
    ];
    next(err);
  }
};
