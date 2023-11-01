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
      (pet) => pet[0].PET_pet_no
    );
    const result = await PetProgramService.findPetProgramsByPetNo(petNo);
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
