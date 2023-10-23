const BreadQuery = require("../../database/pet/bread-query");

/* 전체 견종 조회 - 김종완 */
exports.findAllBreads = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(BreadQuery.findAllBreads(), [], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.length === 0) {
        resolve(null);
      }
      resolve(result);
    });
  });
};

/* 견종 번호로 견종 이름 조회 - 김종완 */
exports.findBreadByBreadNo = (connection, breadNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      BreadQuery.findBreadByBreadNo(),
      [breadNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length === 0) {
          resolve(null);
        }
        resolve(result);
      }
    );
  });
};

/* 견종 등록 - 김종완 */
exports.createBread = (connection, breadName) => {
  console.log(breadName);
  return new Promise((resolve, reject) => {
    connection.query(BreadQuery.createBread(), [breadName], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

/* 견종 수정 - 김종완 */
exports.updateBread = (connection, breadDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      BreadQuery.updateBread(),
      [breadDTO.breadName, breadDTO.breadNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

/* 견종 삭제 - 김종완 */
exports.deleteBread = (connection, breadNo) => {
  return new Promise((resolve, reject) => {
    connection.query(BreadQuery.deleteBread(), [breadNo], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
