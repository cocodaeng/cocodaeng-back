const HttpStatus = require("http-status");
const PetDTO = require("../../dto/pet/request/pet-dto");
const PetService = require("../../services/pet/pet-service");

// 회원 번호로 펫 조회
exports.findPet = async (req, res) => {
  const result = await PetService.findPet(1);
  console.log(result);

  if (result !== null) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "펫 조회 성공",
      pet: {
        pet_no: result.petNo,
        member_no: result.memberNo,
        bread_no: result.breadNo,
        pet_name: result.petName,
        pet_profile_picture: result.petProfilePicture,
        pet_age: result.petAge,
        pet_weight: result.petWeight,
        create_date: result.createDate,
        pet_status: result.petStatus,
      },
    });
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "펫 조회 실패",
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
