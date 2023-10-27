/* 전체 견종 조회 - 김종완 */
exports.findAllBreads = () => {
  return `
        SELECT *
          FROM TBL_BREAD
    `;
};

/* 견종 번호로 견종 이름 조회 - 김종완 */
exports.findBreadByBreadNo = () => {
  return `
        SELECT BRD_bread_no
             , BRD_bread_name
          FROM TBL_BREAD
         WHERE BRD_bread_no =?
    `;
};

/* 견종 등록 - 김종완 */
exports.createBread = () => {
  return `
        INSERT 
          INTO TBL_BREAD
            (BRD_bread_name)
       VALUES (?)
    `;
};

/* 견종 수정 - 김종완 */
exports.updateBread = () => {
  return `
        UPDATE TBL_BREAD
           SET BRD_bread_name = ?
         WHERE BRD_bread_no =?
    `;
};

/* 견종 삭제 - 김종완 */
exports.deleteBread = () => {
  return `
        DELETE FROM TBL_BREAD
         WHERE BRD_bread_no =?
    `;
};
