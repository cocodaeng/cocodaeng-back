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

// 펫 등록
exports.createPet = () => {
  return `
        INSERT INTO TBL_PETS
            (PET_member_no, PET_bread_no, PET_pet_name, PET_pet_profile_picture,
              PET_pet_age, PET_pet_weight, PET_create_date, PET_pet_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
};
