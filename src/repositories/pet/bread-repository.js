const BreadQuery = require("../../database/pet/bread-query");

exports.findAllBreads = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(BreadQuery.findAllBreads(), [], (error, result) => {
      if (error) {
        reject(error);
      }
      if (result.length === 0) {
        resolve(null);
      }
      resolve(result);
    });
  });
};
