/* 펫 컨트롤러 */
const HttpStatus = require("http-status");
const PetRequestDTO = require("../../dto/pet/request/pet-request-dto");
const PetDTO = require("../../dto/pet-dto");
const PetService = require("../../services/pet/pet-service");
const JwtDecode = require("../../utils/jwt-decoder");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPetsByMemberNo = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecode.getMemberNoFromToken(token);
    const result = await PetService.findPetsByMemberNo(memberNo);
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
  } catch (err) {
    err.links = [
      {
        rel: "findPetByMemberNo",
        method: "GET",
        href: "api/v1/pet/",
      },
    ];
    next(err);
  }
};

/* 펫 등록 - 김종완*/
exports.createPet = async (req, res, next) => {
  const token = req.headers.authorization;
  const memberNo = JwtDecode.getMemberNoFromToken(token);
  const petProfilePicture = req.files;
  const petDTO = new PetDTO(
    memberNo,
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
    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: "정상적으로 등록되었습니다.",
      result: [],
    });
  } catch (err) {
    err.links = [
      {
        rel: "createPet",
        method: "POST",
        href: "api/v1/pet",
      },
    ];
    next(err);
  }
};
