/* 식재료 탐험 페이지 쿼리 */

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = () => {
  return `
    SELECT PET_PROGRAM_NO, A.PROGRAM_NO, PET_NO, A.PROGRAM_NAME, PET_PROGRAM_RESULT, PROGRAM_EXPLAIN1, PROGRAM_EXPLAIN2, DIET, FODDER, FODDER_LINK
    FROM TBL_PET_PROGRAM A
    LEFT JOIN TBL_PROGRAM B
    ON A.PROGRAM_NO = B.PROGRAM_NO
    WHERE A.PET_NO = ?;
    `;
};
