// 다이어리 전체 조회
exports.findDiaryByNo = () => {
  return `
            SELECT * 
            FROM TBL_DIARY
            WHERE pet_no = ?;
        `;
};
