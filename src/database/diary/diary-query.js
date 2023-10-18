/* 다이어리 쿼리 */

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaryByNo = () => {
  return `
            SELECT * 
            FROM TBL_DIARY
            WHERE pet_no = ?
            AND diary_status = 1;
        `;
};
