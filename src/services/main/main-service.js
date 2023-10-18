/* 홈 화면 서비스 */
const getConnection = require("../../database/connection");
const MainRepository = require("../../repositories/main/main-repository");
const PetRepository = require("../../repositories/pet/pet-repository");

/* 홈 화면 조회하는 메소드 - 조만제 */
exports.findMainPage = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const petResult = await PetRepository.findPetByNo(connection, memberNo);
    const petNo = petResult[0].pet_no;

    await insertPetAllergyProgram(connection, petNo);

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

/* 알러지 유발하는 식재료 있는 프로그램을 결과 나쁨으로 세팅하는 메소드 - 조만제 */
async function insertPetAllergyProgram(connection, petNo) {
  const petAllergy = await MainRepository.findPetAllergy(connection, petNo);
  console.log(petAllergy);
  const programAllergy = await MainRepository.findProgramAllergy(connection);
  console.log(programAllergy);
  let allergyProgramNo = [];
  let checkNum = 0;

  for (let i = 0; i < programAllergy.length; i++) {
    for (let j = 0; j < petAllergy.length; j++) {
      if (
        programAllergy[i].ALLERGY_INGREDIENT_NAME ===
          petAllergy[j].ALLERGY_INGREDIENT_NAME &&
        checkNum !== programAllergy[i].PROGRAM_NO
      ) {
        checkNum = programAllergy[i].PROGRAM_NO;
        allergyProgramNo.push(programAllergy[i].PROGRAM_NO);
        break;
      }
    }
  }
  console.log(allergyProgramNo);
  for (let i = 0; i < allergyProgramNo.length; i++) {
    await MainRepository.insertPetAllergyProgram(
      connection,
      allergyProgramNo[i],
      petNo
    );
  }
}
