// 홈 화면 조회
exports.findMainPage = () => {
  return `
        SELECT *
        FROM TBL_PET_PROGRAM A
        LEFT JOIN TBL_DIARY B
        ON A.PET_NO = B.PET_NO
        WHERE A.PET_NO = ?
        AND A.PET_PROGRAM_NO = B.PET_PROGRAM_NO 
        AND CREATE_DATE LIKE ?;
    `;
};
