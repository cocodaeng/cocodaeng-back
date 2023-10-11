// 견종 전체 조회
exports.findAllBreads = () => {
  return `
        SELECT *
          FROM TBL_BREAD
    `;
};
