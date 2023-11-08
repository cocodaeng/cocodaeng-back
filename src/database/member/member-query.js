/* 회원 쿼리 */

/* 회원 번호로 회원 조회 메소드 - 조만제 */
exports.findMemberByMemberNo = () => {
  return `
                SELECT * 
                FROM TBL_MEMBER
                WHERE MEM_member_no = ?
                AND MEM_member_status = 'T';
            `;
};

/* 카카오 아이디로 회원 조회 메소드 - 조만제 */
exports.findMemberByKakaoId = () => {
  return `
              SELECT * 
              FROM TBL_MEMBER
              WHERE MEM_kakao_id = ?
              AND MEM_member_status = 'T';
          `;
};

/* 회원 가입 메소드 - 조만제 */
exports.registMember = () => {
  return `
            INSERT INTO TBL_MEMBER(
              MEM_member_name,
              MEM_kakao_id)
            VALUES(?,?);
        `;
};

/* 애플 회원 가입 메소드 - 김종완 */
exports.registAppleMember = () => {
  return `
    INSERT INTO TBL_MEMBER
    (
      MEM_member_name,
      MEM_apple_id
    )
    VALUES(?,?)
  `;
};
