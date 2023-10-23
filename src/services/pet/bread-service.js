const HttpStatus = require("http-status");
const getConnection = require("../../database/connection");
const BreadRepository = require("../../repositories/pet/bread-repository");

/* 전체 견종 조회 - 김종완 */
exports.findAllBreads = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await BreadRepository.findAllBreads(connection);
      if (result) {
        resolve(result);
      }
      if (!result) {
        const error = new Error("전체 견종 조회에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 견종 번호로 견종 조회 - 김종완 */
exports.findBreadByBreadNo = (breadNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await BreadRepository.findBreadByBreadNo(
        connection,
        breadNo
      );
      console.log(result);
      if (result) {
        resolve(result);
      }
      if (!result) {
        const error = new Error("견종 조회에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 견종 등록 - 김종완 */
exports.createBread = (breadName) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await BreadRepository.createBread(connection, breadName);

      // 등록 성공 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }

      // 등록 반영 실패 시
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error("견종 등록에 실패하였습니다.");
        error.status = HttpStatus.BAD_REQUEST;
        reject(error);
      }
    } catch (err) {
      // 에러 발생 시
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

/* 견종 수정 - 김종완 */
exports.updateBread = (breadDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await BreadRepository.updateBread(connection, breadDTO);
      console.log(result);
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error("견종 수정에 실패하였습니다.");
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

/* 견종 삭제 - 김종완 */
exports.deleteBread = (breadNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await BreadRepository.deleteBread(connection, breadNo);
      console.log(result);

      // 정상 삭제 시
      if (result.affectedRows > 0) {
        connection.commit();
        resolve(result);
      }

      // 삭제 실패 시
      if (result.affectedRows === 0) {
        connection.rollback();
        const error = new Error("견종 삭제에 실패하였습니다.");
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
