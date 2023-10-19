/* 홈 화면 레포지토리 */
const MainQuery = require("../../database/main/main-query");

/* 펫 알러지 조회하는 메소드 - 조만제 */
exports.findPetAllergy = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(MainQuery.findPetAllergy(), [petNo], (err, result) => {
      if (err) {
        console.log("error: " + err);
        reject(err);
      }
      if (result.length === 0) {
        resolve(null);
      }
      resolve(result);
    });
  });
};

/* 프로그램의 알러지들을 조회하는 메소드 - 조만제 */
exports.findProgramAllergy = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(MainQuery.findProgramAllergy(), [], (err, result) => {
      if (err) {
        console.log("error: " + err);
        reject(err);
      }
      resolve(result);
    });
  });
};

/* 홈 화면 조회하는 메소드 - 조만제 */
exports.findMainPage = (connection, petNo, targetMonth) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MainQuery.findMainPage(),
      [petNo, targetMonth],
      (err, result) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        console.log("result", result);
        resolve(result);
      }
    );
  });
};

/* 알러지 유발하는 식재료 있는 프로그램을 결과 나쁨으로 세팅하는 메소드 - 조만제 */
exports.insertPetAllergyProgram = (connection, allergyProgramNo, petNo) => {
  return new Promise((resolve, reject) => {
    console.log(allergyProgramNo);
    connection.query(
      MainQuery.insertPetAllergyProgram(),
      [allergyProgramNo, petNo, allergyProgramNo],
      (err, result) => {
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};
