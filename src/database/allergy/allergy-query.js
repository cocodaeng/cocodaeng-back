/* 알러지 유발 식재료 전체 조회 - 김종완 */
exports.findAllAllergies = () => {
  return `
        SELECT *
          FROM TBL_ALLERGY_INGREDIENT
    `;
};
