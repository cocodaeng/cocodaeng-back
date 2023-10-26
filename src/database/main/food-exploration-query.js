/* 식재료 탐험 페이지 쿼리 */

/* 펫이 참여한 프로그램 조회하는 메소드 - 조만제 */
exports.findPetJoinProgram = () => {
  return `
    SELECT PPG_PET_PROGRAM_NO, PPG_PROGRAM_NO, PPG_PET_NO, PPG_PROGRAM_NAME, PPG_PET_PROGRAM_RESULT, PRO_PROGRAM_EXPLAIN1, PRO_PROGRAM_EXPLAIN2, PRO_DIET, PRO_FODDER, PRO_FODDER_LINK
    FROM TBL_PET_PROGRAM
    LEFT JOIN TBL_PROGRAM
    ON PPG_PROGRAM_NO = PRO_PROGRAM_NO
    WHERE PPG_PET_NO = ?
    AND PRO_PROGRAM_STATUS = 1;
    `;
};

/* 기참여 프로그램 조회하는 메소드 - 조만제 */
exports.findParticipationProgram = () => {
  return `
    SELECT PPG_PROGRAM_NAME, PPG_PET_PROGRAM_RESULT, PRO_DIET, PRO_FODDER, DIR_CREATE_DATE, DIR_PET_HEALTH, DIR_DIARY_CONTENT
    FROM TBL_PET_PROGRAM
    LEFT JOIN TBL_PROGRAM
    ON PPG_PROGRAM_NO = PRO_PROGRAM_NO
    LEFT JOIN TBL_DIARY
    ON PPG_PET_NO = DIR_PET_NO
    WHERE PPG_PET_NO = ?
    AND PPG_PROGRAM_NO = ?
    AND PRO_PROGRAM_STATUS = 1
    AND DIR_CREATE_DATE = PPG_PET_START_DATE
    OR DIR_CREATE_DATE = PPG_PET_END_DATE;
  `;
};
