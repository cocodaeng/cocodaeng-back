/* 펫 진행 프로그램 쿼리 */

/* 특정 펫 진행 프로그램 전체 조회 - 조만제 */
exports.findPetProgramsByPetNo = () => {
  return `
          SELECT * 
            FROM TBL_PET_PROGRAM
           WHERE PET_pet_no = ?;
        `;
};
