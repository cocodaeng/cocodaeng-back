/* 펫 컨트롤러 */
const HttpStatus = require("http-status");
const PetDTO = require("../../dto/pet-dto");
const PetAllergyDTO = require("../../dto/pet-allergy-dto");
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
      data: result[0],
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

/* 펫 번호로 펫 조회하는 메소드 - 김종완 */
exports.findPetByPetNo = async (req, res, next) => {
  const petNo = req.params.pet_no;
  try {
    const result = await PetService.findPetByPetNo(petNo);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "펫 조회에 성공하였습니다.",
      data: result[0],
    });
  } catch (err) {
    err.links = [
      {
        rel: "findPetByPetNo",
        method: "GET",
        href: `api/v1/pet/${petNo}`,
      },
    ];
    next(err);
  }
};

/* 펫 등록 - 김종완*/
exports.createPet = async (req, res, next) => {
  const token = req.headers.authorization;
  const memberNo = JwtDecode.getMemberNoFromToken(token);
  const petProfilePicture = req.files.pet_profile
    ? req.files.pet_profile[0].path
    : null;
  const allergyIngredientNoList = req.body.allergy_ingredient_no_list
    ? req.body.allergy_ingredient_no_list
    : null;
  console.log("알러지 리스트 : ", allergyIngredientNoList);
  const petDTO = new PetDTO(
    null,
    memberNo,
    req.body.bread_no,
    req.body.pet_name,
    petProfilePicture,
    req.body.pet_age,
    req.body.pet_weight,
    new Date(),
    1
  );
  console.log(petDTO);
  try {
    const result = await PetService.createPet(petDTO);
    const allergyDTO = new PetAllergyDTO(
      result.insertId,
      allergyIngredientNoList
    );
    let allergyResult = null;
    if (allergyIngredientNoList) {
      allergyResult = await PetService.createPetAllergies(allergyDTO);

      console.log(allergyResult);
      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: "정상적으로 등록되었습니다.",
        data: {
          PET_pet_no: result.insertId,
          insertedPAG: allergyResult.affectedRows,
        },
      });
    }
    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: "정상적으로 등록되었습니다.",
      data: {
        PET_pet_no: result.insertId,
      },
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
