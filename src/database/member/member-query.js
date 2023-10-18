/* 회원 쿼리 */

/* 회원 번호로 회원 조회 메소드 - 조만제 */
exports.findMemberByNo = () => {
  return `
                SELECT * 
                FROM TBL_MEMBER
                WHERE member_no = ?
                AND member_status = 'T';
            `;
};

/* 카카오 아이디로 회원 조회 메소드 - 조만제 */
exports.findMemberByKakaoId = () => {
  return `
              SELECT * 
              FROM TBL_MEMBER
              WHERE kakao_id = ?
              AND member_status = 'T';
          `;
};

/* 회원 가입 메소드 - 조만제 */
exports.registMember = () => {
  return `
            INSERT INTO TBL_MEMBER(
              member_name,
              kakao_id)
            VALUES(?,?);
        `;
};
