/* 펫 서비스 */
const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const PetRepository = require("../../repositories/pet/pet-repository");
const PetDTO = require("../../dto/pet-dto");

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPetsByMemberNo = (memberNo) => {
  return new Promise(async (resolve, reject) => {
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

/* 신규 펫 등록 메소드 - 김종완 */
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
