/* 식재료 탐험 페이지 컨트롤러 */
const FoodExplorationService = require("../../services/main/food-exploration-service");
const HttpStatus = require("http-status");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = async (req, res) => {
  const result = await FoodExplorationService.findPetJoinProgram(1);
  let pet_program_data = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      pet_program_data[i] = {
        pet_program_no: result[i].PET_PROGRAM_NO,
        program_no: result[i].PROGRAM_NO,
        pet_no: result[i].PET_NO,
        program_name: result[i].PROGRAM_NAME,
        pet_program_result: result[i].PET_PROGRAM_RESULT,
        program_explain1: result[i].PROGRAM_EXPLAIN1,
        program_explain2: result[i].PROGRAM_EXPLAIN2,
        diet: result[i].DIET,
        fodder: result[i].FODDER,
        fodder_link: result[i].FODDER_LINK,
      };
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "홈 화면 조회 성공",
      pet_program_data: pet_program_data,
    });
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "홈 화면 조회 실패",
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
