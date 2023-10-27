/* 홈 화면 쿼리 */

/* 홈 화면 조회하는 메소드 - 조만제 */
exports.findMainPage = () => {
  return `
    SELECT *
    FROM TBL_PET_PROGRAM 
    LEFT JOIN TBL_DIARY 
    ON PPG_PET_NO = DIR_PET_NO
    WHERE PPG_PET_NO = ?
    AND DIR_DIARY_STATUS = 1
    AND PPG_PET_PROGRAM_NO = DIR_PET_PROGRAM_NO 
    AND DIR_CREATE_DATE LIKE ?;
  `;
};

/* 펫의 알러지들을 조회하는 메소드 - 조만제 */
exports.findPetAllergy = () => {
  return `
    SELECT PAG_PET_NO, AGI_ALLERGY_INGREDIENT_NAME
    FROM TBL_PET_ALLERGY
    LEFT JOIN TBL_ALLERGY_INGREDIENT
    ON PAG_ALLERGY_INGREDIENT_NO = AGI_ALLERGY_INGREDIENT_NO
    WHERE PAG_PET_NO = ?;
  `;
};

/* 프로그램의 알러지들을 조회하는 메소드 - 조만제 */
exports.findProgramAllergy = () => {
  return `
    SELECT PGA_PROGRAM_NO, AGI_ALLERGY_INGREDIENT_NAME
    FROM TBL_PROGRAM_ALLERGY
    LEFT JOIN TBL_ALLERGY_INGREDIENT
    ON PGA_ALLERGY_INGREDIENT_NO = AGI_ALLERGY_INGREDIENT_NO;
  `;
};

/* 알러지 유발하는 식재료 있는 프로그램을 결과 나쁨으로 세팅하는 메소드 - 조만제 */
exports.insertPetAllergyProgram = () => {
  return `
    INSERT INTO tbl_pet_program(PPG_program_no, PPG_pet_no, PPG_program_name, PPG_pet_program_result)
    VALUES(?, ?, (SELECT PRO_PROGRAM_NAME
    FROM TBL_PROGRAM
    WHERE PRO_PROGRAM_NO = ?), 5);
  `;
};
