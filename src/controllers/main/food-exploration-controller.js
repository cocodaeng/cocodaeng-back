/* 식재료 탐험 페이지 컨트롤러 */
const FoodExplorationService = require("../../services/main/food-exploration-service");
const HttpStatus = require("http-status");
const JwtDecoder = require("../../utils/jwt-decoder");
const PetService = require("../../services/pet/pet-service");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecoder.getMemberNoFromToken(token);
    const petNo = await PetService.findPetsByMemberNo(memberNo).then(
      (pet) => pet[0].pet_no
    );
    const result = await FoodExplorationService.findPetJoinProgram(petNo);
    // 조회 성공 시
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "펫이 참여하는 프로그램들 조회 성공",
        data: result,
      });
    }
  } catch (err) {
    // 조회 실패 시
    err.links = [
      {
        rel: "findPetJoinProgram",
        method: "GET",
        href: "api/v1/main/foodExplorationPage",
      },
    ];
    next(err);
  }
};

/* 기 참여 프로그램 조회하는 메소드 - 조만제 */
exports.findParticipationProgram = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecoder.getMemberNoFromToken(token);
    const petNo = await PetService.findPetsByMemberNo(1).then(
      (pet) => pet[0].PET_pet_no
    );
    const programNo = req.params.program_no;
    const result = await FoodExplorationService.findParticipationProgram(
      petNo,
      programNo
    );
    // 조회 성공 시
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "기 참여 프로그램 조회 성공",
        data: result,
      });
    }
  } catch (err) {
    // 조회 실패 시
    err.links = [
      {
        rel: "findPetJoinProgram",
        method: "GET",
        href: "api/v1/main/foodExplorationPage",
      },
    ];
    next(err);
  }
};

/* 미 참여 프로그램 조회하는 메소드 - 조만제 */
exports.findNonParticipationProgram = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecoder.getMemberNoFromToken(token);
    const petNo = await PetService.findPetsByMemberNo(1).then(
      (pet) => pet[0].PET_pet_no
    );
    const programNo = req.params.program_no;
    const result = await FoodExplorationService.findNonParticipationProgram(
      petNo,
      programNo
    );
    // 조회 성공 시
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "미 참여 프로그램 조회 성공",
        data: result,
      });
    }
  } catch (err) {
    // 조회 실패 시
    err.links = [
      {
        rel: "findPetJoinProgram",
        method: "GET",
        href: "api/v1/main/foodExplorationPage",
      },
    ];
    next(err);
  }
};
