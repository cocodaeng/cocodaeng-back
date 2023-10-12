// 견종 전체 조회
exports.findAllBreads = () => {
  return `
        SELECT *
          FROM TBL_BREAD
    `;
};

// 견종 번호로 견종 이름 조회
exports.findBreadByBreadNo = () => {
  return `
        SELECT bread_name
          FROM TBL_BREAD
         WHERE bread_no =?
    `;
};

// 견종 등록
exports.createBread = () => {
  return `
        INSERT 
          INTO TBL_BREAD
               (bread_name)
        VALUSE (?)
    `;
};

// 견종 수정
exports.updateBread = () => {
  return `
        UPDATE TBL_BREAD
           SET bread_name = ?,
         WHERE bread_no =?
    `;
};

exports.deleteBread = () => {
  return `
        DELETE FROM TBL_BREAD
         WHERE bread_no =?
    `;
};
