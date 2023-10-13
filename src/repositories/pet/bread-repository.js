const BreadQuery = require("../../database/pet/bread-query");

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
        console.log(result);
        resolve(result);
      }
    );
  });
};

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

exports.updateBread = (connection, breadDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      BreadQuery.updateBread(),
      [breadDTO.breadName, breadDTO.breadNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (!result.affectedRows) {
          resolve(null);
        }
        resolve(result);
      }
    );
  });
};

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
