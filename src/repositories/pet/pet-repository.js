const PetQuery = require("../../database/pet/pet-query");

exports.createPet = (connection, petDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      PetQuery.createPet(),
      [
        petDTO.memberNo,
        petDTO.breadNo,
        petDTO.petName,
        petDTO.petProfilePicture,
        petDTO.petWeight,
        petDTO.createDate,
        petDTO.petStatus,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
