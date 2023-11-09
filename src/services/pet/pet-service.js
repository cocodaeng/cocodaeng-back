/* 펫 서비스 */
const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const PetRepository = require("../../repositories/pet/pet-repository");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPetsByMemberNo = (memberNo) => {
  return new Promise(async (resolve, reject) => {
    console.log(memberNo);
    const connection = getConnection();
    try {
      const result = await PetRepository.findPetsByMemberNo(
        connection,
        memberNo
      );
      console.log(result);
      // 조회 성공 시
      if (result) {
        resolve(result);
      }

      // 조회 실패 시
      if (!result) {
        const error = new Error("조회 실패");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 에러 발생 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 펫 번호로 펫 조회하는 메소드 - 김종완 */
exports.findPetByPetNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await PetRepository.findPetByPetNo(connection, petNo);

      // 조회 성공 시
      if (result) {
        resolve(result);
      }

      // 조회 실패 시
      if (!result) {
        const error = new Error("일치하는 펫이 존재하지 않습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 에러 발생 시
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 펫 등록 메소드 - 김종완 */
exports.createPet = (petDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await PetRepository.createPet(connection, petDTO);
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error("펫 생성에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 펫 등록 후 알러지 정보 삽입 - 김종완 */
exports.createPetAllergies = (allergyDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    const allergyListLength = allergyDTO.allergyIngredientNoList.length;
    console.log("알러지 리스트 길이 : ", allergyListLength);
    try {
      const result = await PetRepository.createAllergies(
        connection,
        allergyDTO
      );
      // 등록 성공 시
      if (result.affectedRows) {
        if (result.affectedRows === allergyListLength) {
          connection.commit();
          resolve(result);
        }

        // 알러지가 다 등록되지 않았을 때
        if (result.affectedRows < allergyListLength) {
          connection.rollback();
          const error = new Error("알러지 등록에 실패하였습니다.");
          error.status = HttpStatus.BAD_REQUEST;
          reject(error);
        }
      }

      // 등록 실패 시
      if (!result.affectedRows) {
        const error = new Error("알러지 등록에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 과정 중 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
