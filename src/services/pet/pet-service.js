const getConnection = require("../../database/connection");
const PetRepository = require("../../repositories/pet/pet-repository");
const PetDTO = require("../../dto/pet-dto");

// 회원 번호로 펫 조회
exports.findPet = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    const result = await PetRepository.findPetByNo(connection, memberNo);

    if (result !== null) {
      // 조회 성공 시
      const pet = new PetDTO({
        petNo: result[0].pet_no,
        memberNo: result[0].member_no,
        breadNo: result[0].bread_no,
        petName: result[0].pet_name,
        petProfilePicture: result[0].pet_profile_picture,
        petAge: result[0].pet_age,
        petWeight: result[0].pet_weight,
        createDate: result[0].create_date,
        petStatus: result[0].pet_status,
      });
      console.log(pet);
      resolve(pet);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("회원 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};
