const HttpStatus = require("http-status");
const AllergyService = require("../../services/allergy/allergy-service");

/* 알러지 유발 식재료 전체 조회 - 김종완 */
exports.findAllAllergies = async (req, res, next) => {
  try {
    const result = await AllergyService.findAllAllergies();
    // 조회 성공 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      data: result,
    });
  } catch (err) {
    // 조회 실패 시
    err.links = [
      {
        rel: "findAllAllergies",
        method: "GET",
        href: "api/v1/allergy",
      },
    ];
    next(err);
  }
};
