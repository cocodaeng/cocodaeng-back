const HttpStatus = require("http-status");
const BreadService = require("../../services/pet/bread-service");

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
