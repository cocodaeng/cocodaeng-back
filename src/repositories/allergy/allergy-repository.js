const AllergyQuery = require("../../database/allergy/allergy-query");

exports.findAllAllergies = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(AllergyQuery.findAllAllergies(), [], (err, result) => {
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
