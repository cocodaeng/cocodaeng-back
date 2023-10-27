const HttpStatus = require("http-status");
const BreadDTO = require("../../dto/pet/request/bread-dto");
const BreadService = require("../../services/pet/bread-service");

// 견종 전체 조회
exports.findAllBreads = async (req, res, next) => {
  try {
    const result = await BreadService.findAllBreads();
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 조회되었습니다.",
      result: result,
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

// 견종 조회
exports.findBreadByBreadNo = async (req, res, next) => {
  const breadNo = req.params.bread_no;
  try {
    const result = await BreadService.findBreadByBreadNo(breadNo);
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "성공적으로 조회되었습니다.",
        data: result[0],
        contentLocation: `api/v1/pet/bread/${breadNo}`,
      });
    }
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

// 견종 등록
exports.createBread = async (req, res, next) => {
  try {
    const breadName = req.body.bread_name;
    const result = await BreadService.createBread(breadName);
    console.log(result);
    if (result) {
      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: "정상적으로 등록되었습니다.",
        result: {
          BRD_bread_no: result.insertId,
        },
      });
    }
    if (!result.affectedRows) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "등록에 실패하였습니다.",
        result: [],
        links: [
          {
            rel: "creatBread",
            method: "POST",
            href: `api/v1/pet/bread`,
          },
        ],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      result: [],
      links: [
        {
          rel: "creatBread",
          method: "POST",
          href: `api/v1/pet/bread`,
        },
      ],
    });
  }
};

// 견종 수정
exports.updateBread = async (req, res, next) => {
  const breadDTO = new BreadDTO(req.params.bread_no, req.body.bread_name);
  try {
    const result = await BreadService.updateBread(breadDTO);
    console.log(result);
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "정상적으로 수정되었습니다.",
      });
    }
    if (result.affectedRows === 0) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "잘못된 요청입니다.",
        result: [],
        links: [
          {
            rel: "updateBread",
            method: "PUT",
            href: `api/v1/pet/bread/${req.params.bread_no}`,
          },
        ],
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      links: [
        {
          rel: "updateBread",
          method: "PUT",
          href: `api/v1/pet/bread/${req.params.bread_no}`,
        },
      ],
    });
  }
};

// 견종 삭제
exports.deleteBread = async (req, res, next) => {
  const breadNo = req.params.bread_no;
  try {
    const result = await BreadService.deleteBread(breadNo);
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "성공적으로 삭제되었습니다.",
        result: [],
      });
    }
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: err.message,
      links: [
        {
          rel: "deleteBread",
          method: "DELETE",
          href: `api/v1/pet/bread/${req.params.bread_no}`,
        },
      ],
    });
  }
};
