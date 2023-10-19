/* 홈 화면 쿼리 */

/* 홈 화면 조회하는 메소드 - 조만제 */
exports.findMainPage = () => {
  return `
    SELECT *
      FROM TBL_PET_PROGRAM A
      LEFT JOIN TBL_DIARY B
        ON A.PET_NO = B.PET_NO
     WHERE A.PET_NO = ?
       AND B.DIARY_STATUS = 1
       AND A.PET_PROGRAM_NO = B.PET_PROGRAM_NO 
       AND CREATE_DATE LIKE ?;
    `;
};

/* 펫의 알러지들을 조회하는 메소드 - 조만제 */
exports.findPetAllergy = () => {
  return `
    SELECT PET_NO,B.ALLERGY_INGREDIENT_NAME
    FROM TBL_PET_ALLERGY A
    LEFT JOIN TBL_ALLERGY_INGREDIENT B
    ON A.ALLERGY_INGREDIENT_NO = B.ALLERGY_INGREDIENT_NO
    WHERE PET_NO = ?;
    `;
};

/* 프로그램의 알러지들을 조회하는 메소드 - 조만제 */
exports.findProgramAllergy = () => {
  return `
    SELECT PROGRAM_NO,B.ALLERGY_INGREDIENT_NAME
    FROM TBL_PROGRAM_ALLERGY A
    LEFT JOIN TBL_ALLERGY_INGREDIENT B
    ON A.ALLERGY_INGREDIENT_NO = B.ALLERGY_INGREDIENT_NO;
    `;
};

/* 알러지 유발하는 식재료 있는 프로그램을 결과 나쁨으로 세팅하는 메소드 - 조만제 */
exports.insertPetAllergyProgram = () => {
  return `
    INSERT INTO tbl_pet_program(program_no, pet_no, program_name, pet_program_result)
    VALUES(?, ?, (SELECT PROGRAM_NAME
    FROM TBL_PROGRAM
    WHERE PROGRAM_NO = ?), 4);
  `;
};
