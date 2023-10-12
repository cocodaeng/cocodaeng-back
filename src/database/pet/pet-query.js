// 회원 번호로 펫 조회
exports.findPetByNo = () => {
  return `
                  SELECT * 
                  FROM TBL_PETS
                  WHERE member_no = ?;
              `;
};
