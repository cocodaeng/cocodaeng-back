/* 펫 컨트롤러 */
const HttpStatus = require("http-status");
const PetRequestDTO = require("../../dto/pet/request/pet-request-dto");
const PetDTO = require("../../dto/pet-dto");
const PetService = require("../../services/pet/pet-service");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPet = async (req, res) => {
  const result = await PetService.findPet(1);
  console.log(result);

  if (result !== null) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "펫 조회 성공",
      pet: {
        pet_no: result[0].pet_no,
        member_no: result[0].member_no,
        bread_no: result[0].bread_no,
        pet_name: result[0].pet_name,
        pet_profile_picture: result[0].pet_profile_picture,
        pet_age: result[0].pet_age,
        pet_weight: result[0].pet_weight,
        create_date: result[0].create_date,
        pet_status: result[0].pet_status,
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
  const petProfilePicture = req.file.location;
  const petDTO = new PetDTO(
    req.body.memberNo,
    req.body.breadNo,
    req.body.petName,
    petProfilePicture,
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
