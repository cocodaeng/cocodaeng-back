/* 식재료 탐험 페이지 컨트롤러 */
const FoodExplorationService = require("../../services/main/food-exploration-service");
const HttpStatus = require("http-status");

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = async (req, res) => {
  const result = await FoodExplorationService.findPetJoinProgram(1);

  // 조회 성공 시
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "펫이 참여하는 프로그램들 조회 성공",
      data: result,
    });
  }

  // 조회 실패 시
  if (!result) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "펫이 참여하는 프로그램들 조회 실패",
      code: -999999,
      links: [
        {
          rel: "findPetJoinProgram",
          method: "GET",
          href: "api/v1/main/foodExplorationPage",
        },
      ],
    });
  }
};
