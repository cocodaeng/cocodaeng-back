const getConnection = require("../../database/connection");
const AllergyRepository = require("../../repositories/allergy/allergy-repository");

exports.findAllAllergies = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await AllergyRepository.findAllAllergies(connection);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};
