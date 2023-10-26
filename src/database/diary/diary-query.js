/* 다이어리 쿼리 */

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiariesByPetNo = () => {
  return `
    SELECT * 
    FROM TBL_DIARY
    WHERE DIR_pet_no = ?
    AND DIR_diary_status = 1;
  `;
};

/* 다이어리 번호로 다이어리 조회 - 김종완 */
exports.findDiaryByDiaryNo = () => {
  return `
      SELECT DIR_diary_no
           , DIR_pet_no
           , DIR_pet_program_no
           , DIR_diary_content
           , DIR_fodder_name
           , DIR_pet_health
           , DIR_diary_photo_left_eye
           , DIR_diary_photo_right_eye
           , DIR_diary_photo_left_ear
           , DIR_diary_photo_right_ear
           , DIR_diary_photo_anal
           , DIR_diary_photo_etc
           , DIR_create_date
           , DIR_update_date
           , DIR_diary_status
        FROM TBL_DIARY
       WHERE DIR_diary_no = ?
         AND DIR_diary_status =1
  `;
};

/* 다이어리 신규 등록 - 김종완 */
exports.createDiary = () => {
  return `
      INSERT INTO TBL_DIARY
      (
        DIR_pet_no,
        DIR_pet_program_no,
        DIR_diary_content,
        DIR_fodder_name,
        DIR_pet_health,
        DIR_diary_photo_left_eye,
        DIR_diary_photo_right_eye,
        DIR_diary_photo_left_ear,
        DIR_diary_photo_right_ear,
        DIR_diary_photo_anal,
        DIR_diary_photo_etc,
        DIR_create_date
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
};

/* 다이어리 수정 - 김종완 */
exports.updateDiary = () => {
  return `
      UPDATE TBL_DIARY
        SET
        DIR_pet_no = ?,
        DIR_pet_program_no = ?,
        DIR_diary_content = ?,
        DIR_fodder_name = ?,
        DIR_pet_health = ?,
        DIR_diary_photo_left_eye = ?,
        DIR_diary_photo_right_eye = ?,
        DIR_diary_photo_left_ear = ?,
        DIR_diary_photo_right_ear = ?,
        DIR_diary_photo_anal = ?,
        DIR_diary_photo_etc = ?,
        DIR_update_date = ?
        WHERE DIR_diary_no = ?
  `;
};

/* 다이어리 삭제(상태 값 변경) - 김종완 */
exports.deleteDiary = () => {
  return `
      UPDATE TBL_DIARY
         SET
         DIR_diary_status = ?
       WHERE DIR_diary_no = ?
  `;
};
