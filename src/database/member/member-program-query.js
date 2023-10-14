// 펫 번호로 회원 진행 프로그램 전체 조회
exports.findMemberProgramByNo = () => {
  return `
                  SELECT * 
                  FROM TBL_MEMBER_PROGRAM
                  WHERE pet_no = ?;
              `;
};
