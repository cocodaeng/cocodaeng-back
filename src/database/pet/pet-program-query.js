// 특정 펫 진행 프로그램 전체 조회
exports.findPetProgramByNo = () => {
  return `
          SELECT * 
          FROM TBL_PET_PROGRAM
          WHERE pet_no = ?;
        `;
};
