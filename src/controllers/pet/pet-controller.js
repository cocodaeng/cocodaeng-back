const PetService = require("../../services/pet/pet-service");
const HttpStatus = require("http-status");

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
