/* 펫 쿼리 */

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPetsByMemberNo = () => {
  return `
    SELECT * 
    FROM TBL_PETS
    WHERE PET_member_no = ?
    AND PET_pet_status = 1;
  `;
};

/* 펫 번호로 펫 조회하는 메소드 - 김종완 */
exports.findPetByPetNo = () => {
  return `
    SELECT *
    FROM TBL_PETS
    WHERE PET_pet_no = ?
    AND PET_pet_status = 1
  `;
};

/* 펫 등록 - 김종완 */
exports.createPet = () => {
  return `
        INSERT INTO TBL_PETS
            (PET_member_no, PET_bread_no, PET_pet_name, PET_pet_profile_picture,
              PET_pet_age, PET_pet_weight, PET_create_date, PET_pet_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
};

/* 펫 등록 후 알러지 정보 삽입 - 김종완 */
exports.createAllergies = () => {
  return `
    INSERT INTO TBL_PET_ALLERGY
    ( 
      PAG_pet_no,
      PAG_allergy_ingredient_no
    )
    VALUES ?
  `;
};
