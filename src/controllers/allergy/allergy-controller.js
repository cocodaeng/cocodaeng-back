const HttpStatus = require("http-status");
const AllergyService = require("../../services/allergy/allergy-service");

/* 알러지 유발 식재료 전체 조회 - 김종완 */
exports.findAllAllergies = async (req, res, next) => {
  const result = await AllergyService.findAllAllergies();
  // 조회 성공 시
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      data: result,
    });
  }
  // 조회 실패 시
  if (!result) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "조회에 실패하였습니다.",
      data: [],
      links: [
        {
          rel: "findAllAllergies",
          method: "GET",
          href: "api/v1/allergy",
        },
      ],
    });
  }
};
