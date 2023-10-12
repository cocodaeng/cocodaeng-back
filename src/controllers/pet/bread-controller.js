const HttpStatus = require("http-status");
const BreadDTO = require("../../dto/pet/request/bread-dto");
const BreadService = require("../../services/pet/bread-service");

// 견종 전체 조회
exports.findAllBreads = async (req, res) => {
  const result = await BreadService.findAllBreads();
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 조회되었습니다.",
      result: result,
      contentLocation: `/pet/findAllBreads`,
    });
  }
  if (!result) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "조회에 실패하였습니다.",
      result: [],
      links: [
        {
          rel: "findAllBreads",
          method: "GET",
          href: `/pet/findAllBreads`,
        },
      ],
    });
  }
};

// 견종 조회
exports.findBreadByBreadNo = async (req, res, next) => {
  const breadNo = req.params.breadNo;
  const result = await BreadService.findBreadByBreadNo(breadNo);
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: result,
      contentLocation: `pet/findBreadByBreadNo/${breadNo}`,
    });
  }
  if (!result) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "조회에 실패하였습니다.",
      result: [],
      links: [
        {
          rel: "findBreadByBreadNo",
          method: "GET",
          href: `/movie/${breadNo}`,
        },
      ],
    });
  }
};

// 견종 등록
exports.createBread = async (req, res, next) => {
  try {
    const breadName = req.body.breadName;
    const result = await BreadService.createBread(breadName);
    if (result) {
      res.status(
        HttpStatus.CREATED.send({
          status: HttpStatus.CREATED,
          message: "정상적으로 등록되었습니다.",
        })
      );
    }
    if (!result) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "등록에 실패하였습니다.",
        result: [],
        links: [
          {
            rel: "creatBread",
            method: "POST",
            href: `/pet`,
          },
        ],
      });
    }
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: err.message,
      result: [],
      links: [
        {
          rel: "creatBread",
          method: "POST",
          href: `/pet`,
        },
      ],
    });
  }
};

// 견종 수정
exports.updateBread = async (req, res, next) => {
  const breadDTO = new BreadDTO(req.params.breadNo, req.body.breadName);
  try {
    const result = await BreadService.updateBread(breadDTO);
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "정상적으로 수정되었습니다.",
        result: [],
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "수정에 실패하였습니다.",
      links: [
        {
          rel: "updateBread",
          method: "PUT",
          href: `/bread/${req.params.breadNo}`,
        },
      ],
    });
  }
};

// 견종 삭제
exports.deleteBread = async (req, res, next) => {
  const breadNo = req.params.breadNo;
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
          href: `/bread/${req.params.breadNo}`,
        },
      ],
    });
  }
};
