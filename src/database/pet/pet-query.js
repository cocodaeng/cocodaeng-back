/* 펫 쿼리 */

/* 회원 번호로 펫 조회하는 메소드 - 조만제 */
exports.findPetByNo = () => {
  return `
                  SELECT * 
                  FROM TBL_PETS
                  WHERE member_no = ?
                  AND pet_status = 1;
              `;
};

// 펫 등록
exports.createPet = () => {
  return `
        INSERT INTO TBL_PET
            (member_no, bread_no, pet_name, pet_profile_picture,
                pet_age, pet_weight, create_date, pet_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
};
