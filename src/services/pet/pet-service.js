const getConnection = require("../../database/connection");
const PetRepository = require("../../repositories/pet/pet-repository");

exports.createPet = (petDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await PetRepository.createPet(connection, petDTO);
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
