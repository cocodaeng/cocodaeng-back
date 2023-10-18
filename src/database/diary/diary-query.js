/* 다이어리 쿼리 */

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiariesByPetNo = () => {
  return `
            SELECT * 
            FROM TBL_DIARY
            WHERE pet_no = ?
            AND diary_status = 1;
        `;
};

/* 다이어리 번호로 다이어리 조회 - 김종완 */
exports.findDiaryByDiaryNo = () => {
  return `
      SELECT diary_no
           , pet_no
           , pet_program_no
           , diary_content
           , fodder_name
           , pet_status
           , diary_photo_left_eye
           , diary_photo_right_eye
           , diary_photo_left_ear
           , diary_photo_right_ear
           , diary_photo_anal
           , diary_photo_etc
           , create_date
        FROM TBL_DIARY
       WHERE diary_no = ?
  `;
};

/* 다이어리 신규 등록 - 김종완 */
exports.createDiary = () => {
  return `
      INSERT INTO TBL_DIARY
      (
        pet_no,
        pet_program_no,
        diary_content,
        fodder_name,
        pet_status,
        diary_photo_left_eye,
        diary_photo_right_eye,
        diary_photo_left_ear,
        diary_photo_right_ear,
        diary_photo_anal,
        diary_photo_etc,
        create_date
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
};

/* 다이어리 수정 - 김종완 */
exports.updateDiary = () => {
  return `
      UPDATE TBL_DIARY
        SET
          pet_no = ?,
          pet_program_no = ?,
          diary_content = ?,
          fodder_name = ?,
          pet_status = ?,
          diary_photo_left_eye = ?,
          diary_photo_right_eye = ?,
          diary_photo_left_ear = ?,
          diary_photo_right_ear = ?,
          diary_photo_anal = ?,
          diary_photo_etc = ?,
          update_date = ?
        WHERE diary_no = ?
  `;
};

/* 다이어리 삭제(상태 값 변경) - 김종완 */
exports.deleteDiary = () => {
  return `
      UPDATE TBL_DIARY
         SET
          delete_status = ?
       WHERE diary_no = ?
  `;
};
