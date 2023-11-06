/* 결과 컨트롤러 */
const ResultService = require("../../services/result/result-service");
const HttpStatus = require("http-status");
const ResultDTO = require("../../dto/result-dto");

/* 최종 결과(시작일 - 종료일) 조회 - 김종완*/
exports.findFinalResult = async (req, res, next) => {
  const { petNo, programNo } = req.query;
  try {
    const resultDTO = new ResultDTO(petNo, programNo, null);
    const result = await ResultService.findFinalResult(resultDTO);
    // 조회 성공 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "최종 결과 조회에 성공하였습니다.",
      data: result,
    });
  } catch (err) {
    // 에러 발생 or 조회 실패 시
    err.links = [
      {
        rel: "findFinalResult",
        method: "GET",
        href: "api/v1/result/findFinalResult",
      },
    ];
    next(err);
  }
};

/* 최종 결과 전체 기록 조회 - 김종완 */
exports.findAllResults = async (req, res, next) => {
  const { petNo, programNo } = req.query;
  try {
    const resultDTO = new ResultDTO(petNo, programNo, null);
    const result = await ResultService.findAllResults(resultDTO);
    // 조회 성공 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "전체 결과 조회에 성공하였습니다.",
      data: result,
    });
  } catch (err) {
    // 에러 발생 or 조회 실패 시
    err.links = [
      {
        rel: "findAllResults",
        method: "GET",
        href: "api/v1/result/findAllResults",
      },
    ];
    next(err);
  }
};

/* 최종 결과 업데이트 - 김종완 */
exports.updateResult = async (req, res, next) => {
  const { petNo, programNo, programResult } = req.query;
  try {
    const resultDTO = new ResultDTO(petNo, programNo, programResult);
    const result = await ResultService.createResult(resultDTO);
    // 결과 업데이트 성공 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "프로그램 수정에 성공하였습니다.",
      data: result.message,
    });
  } catch (err) {
    err.links = [
      {
        rel: "updateResult",
        method: "PUT",
        href: `api/v1/result/${programResult}`,
      },
    ];
    next(err);
  }
};
