const HttpStatus = require("http-status");
const BreadDTO = require("../../dto/pet/request/bread-dto");
const BreadService = require("../../services/pet/bread-service");

/* 전체 견종 조회 - 김종완 */
exports.findAllBreads = async (req, res, next) => {
  try {
    const result = await BreadService.findAllBreads();
    console.log(result);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 조회되었습니다.",
      data: result,
      contentLocation: "api/v1/pet/bread",
    });
  } catch (err) {
    err.links = [
      {
        rel: "findAllBreads",
        method: "GET",
        href: `api/v1/pet/bread`,
      },
    ];
    next(err);
  }
};

/* 견종 번호로 견종 조회 - 김종완 */
exports.findBreadByBreadNo = async (req, res, next) => {
  const breadNo = req.params.bread_no;
  try {
    const result = await BreadService.findBreadByBreadNo(breadNo);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: {
        breadNo: result[0].bread_no,
        breadName: result[0].bread_name,
      },
      contentLocation: `api/v1/pet/bread/${breadNo}`,
    });
  } catch (err) {
    err.links = [
      {
        rel: "findBreadByBreadNo",
        method: "GET",
        href: `api/v1/pet/bread/${breadNo}`,
      },
    ];
    next(err);
  }
};

/* 견종 등록 - 김종완 */
exports.createBread = async (req, res, next) => {
  try {
    const breadName = req.body.breadName;
    const result = await BreadService.createBread(breadName);
    console.log(result);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: "정상적으로 등록되었습니다.",
      result: {
        breadNo: result.insertId,
      },
    });
  } catch (err) {
    err.links = [
      {
        rel: "creatBread",
        method: "POST",
        href: `api/v1/pet/bread`,
      },
    ];
    next(err);
  }
};

/* 견종 수정 - 김종완 */
exports.updateBread = async (req, res, next) => {
  const breadDTO = new BreadDTO(req.params.bread_no, req.body.bread_name);
  try {
    const result = await BreadService.updateBread(breadDTO);
    console.log(result);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 수정되었습니다.",
    });
  } catch (err) {
    err.links = [
      {
        rel: "updateBread",
        method: "PUT",
        href: `api/v1/pet/bread/${req.params.breadNo}`,
      },
    ];
    next(err);
  }
};

/* 견종 삭제 - 김종완 */
exports.deleteBread = async (req, res, next) => {
  const breadNo = req.params.bread_no;
  try {
    const result = await BreadService.deleteBread(breadNo);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 삭제되었습니다.",
      result: [],
    });
  } catch (err) {
    err.links = [
      {
        rel: "deleteBread",
        method: "DELETE",
        href: `api/v1/pet/bread/${breadNo}`,
      },
    ];
    next(err);
  }
};
