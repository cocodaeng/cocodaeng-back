/* 결과 쿼리 */

/* 최종 결과(시작일 - 종료일) 조회 - 김종완*/
exports.findFinalRsult = () => {
  return `
    SELECT ppg.PPG_pet_program_name,
           ppg.PPG_pet_start_date,
           ppg.PPG_pet_end_date,
           ppg.PPG_pet_program_result,
           dir.DIR_pet_health,
           dir.DIR_diary_photo_left_eye,
           dir.DIR_diary_photo_right_eye,
           dir.DIR_diary_photo_left_ear,
           dir.DIR_diary_photo_right_ear,
           dir.DIR_diary_photo_anal,
           dir.DIR_diary_photo_etc,
           dir.DIR_create_date
      FROM TBL_PET_PROGRAM ppg
      LEFT JOIN TBL_DIARY dir ON ppg.PPG_pet_program_no = dir.DIR_pet_program_no 
       AND (DATE(dir.DIR_create_date) = DATE(ppg.PPG_pet_start_date) 
        OR DATE(dir.DIR_create_date) >= DATE(DATE_ADD(ppg.PPG_pet_start_date, INTERVAL 20 DAY)))
     WHERE ppg.PPG_pet_no = ? 
       AND ppg.PPG_program_no = ? 
       AND dir.DIR_diary_status = 1;
    `;
};

/* 최종 결과 전체 기록 조회 - 김종완 */
exports.findAllResults = () => {
  return `
    SELECT ppg.PPG_pet_program_n ame,
           ppg.PPG_pet_start_date,
           ppg.PPG_pet_end_date,
           ppg.PPG_pet_program_result,
           dir.DIR_pet_health,
           dir.DIR_diary_photo_left_eye,
           dir.DIR_diary_photo_right_eye,
           dir.DIR_diary_photo_left_ear,
           dir.DIR_diary_photo_right_ear,
           dir.DIR_diary_photo_anal,
           dir.DIR_diary_photo_etc,
           DIR_create_date
      FROM TBL_PET_PROGRAM ppg
      LEFT JOIN TBL_DIARY dir ON ppg.PPG_pet_program_no = dir.DIR_pet_program_no
     WHERE ppg.PPG_pet_no = ?
       AND ppg.PPG_program_no = ?
       AND dir.DIR_diary_status = 1;
    `;
};

/* 최종 결과 업데이트 - 김종완 */
exports.updateResult = () => {
  return `
        UPDATE TBL_PET_PROGRAM
           SET PPG_pet_program_result = ?
         WHERE PPG_pet_no = ?
           AND PPG_program_no = ?
    `;
};
