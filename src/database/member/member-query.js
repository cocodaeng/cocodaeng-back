// 회원 번호로 회원 조회
exports.findMemberByNo = () => {
  return `
                SELECT * 
                FROM TBL_MEMBER
                WHERE member_no = ?;
            `;
};

// 카카오 아이디로 회원 조회
exports.findMemberByKakaoId = () => {
  return `
              SELECT * 
              FROM TBL_MEMBER
              WHERE kakao_id = ?;
          `;
};

// 회원가입
exports.registMember = () => {
  return `
            INSERT INTO TBL_MEMBER(
              member_name,
              kakao_id)
            VALUES(?,?);
        `;
};
