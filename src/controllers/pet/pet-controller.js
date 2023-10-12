const HttpStatus = require("http-status");
const PetDTO = require("../../dto/pet/request/pet-dto");
const PetService = require("../../services/pet/pet-service");

// 펫 등록
exports.createPet = async (req, res, next) => {
  const petDTO = new PetDTO(
    req.body.memberNo,
    req.body.breadNo,
    req.body.petName,
    req.body.petProfilePicture,
    req.body.petAge,
    req.body.petWeight,
    req.body.createDate,
    req.body.petStatus
  );

  try {
    const result = await PetService.createPet(petDTO);
    if (result) {
      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: "정상적으로 등록되었습니다.",
        result: [],
      });
    }
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: err.message,
      result: [],
      links: [
        {
          rel: "createPet",
          method: "POST",
          href: "api/v1/pet",
        },
      ],
    });
  }
};
