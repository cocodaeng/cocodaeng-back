const getConnection = require("../../database/connection");
const BreadRepository = require("../../repositories/pet/bread-repository");

exports.findAllBreads = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await BreadRepository.findAllBreads(connection);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
