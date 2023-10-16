const getConnection = require("../../database/connection");
const MainRepository = require("../../repositories/main/main-repository");
const PetRepository = require("../../repositories/pet/pet-repository");

// 홈 화면 조회
exports.findMainPage = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const petResult = await PetRepository.findPetByNo(connection, memberNo);
    const petNo = petResult[0].pet_no;
    let nowDate = new Date();
    let targetMonth =
      nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "%";
    const result = await MainRepository.findMainPage(
      connection,
      petNo,
      targetMonth
    );

    if (result !== null) {
      resolve(result);
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
