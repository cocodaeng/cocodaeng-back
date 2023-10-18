/* 다이어리 컨트롤러 */
const DiaryService = require("../../services/diary/diary-service");
const HttpStatus = require("http-status");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaries = async (req, res) => {
  const result = await DiaryService.findDiaryByNo(1);
  let diaries = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      diaries[i] = {
        diary_no: result[i].diary_no,
        pet_no: result[i].pet_no,
        pet_program_no: result[i].pet_program_no,
        diary_content: result[i].diary_content,
        fodder_name: result[i].fodder_name,
        pet_health: result[i].pet_health,
        diary_photo_left_eye: result[i].diary_photo_left_eye,
        diary_photo_right_eye: result[i].diary_photo_right_eye,
        diary_photo_left_ear: result[i].diary_photo_left_ear,
        diary_photo_right_ear: result[i].diary_photo_right_ear,
        diary_photo_anal: result[i].diary_photo_anal,
        diary_photo_etc: result[i].diary_photo_etc,
        create_date: result[i].create_date,
        update_date: result[i].update_date,
        delete_date: result[i].delete_date,
        diary_status: result[i].diary_status,
      };
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "다이어리 전체 조회 성공",
      diaries: diaries,
    });
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "다이어리 전체 조회 실패",
      code: -999999,
      links: [
        {
          // rel: "",
          // method: "POST",
          // href: "",
        },
      ],
    });
  }
};
