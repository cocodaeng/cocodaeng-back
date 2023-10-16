const DiaryService = require("../../services/diary/diary-service");
const HttpStatus = require("http-status");

// 다이어리 전체 조회
exports.findDiaries = async (req, res) => {
  const result = await DiaryService.findDiaryByNo(1);
  let diaries = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      diaries[i] = {
        diary_no: result[i].diaryNo,
        pet_no: result[i].petNo,
        pet_program_no: result[i].petProgramNo,
        diary_content: result[i].diaryContent,
        fodder_name: result[i].fodderName,
        create_date: result[i].createDate,
        pet_status: result[i].petStatus,
        diary_photo_left_eye: result[i].diaryPhotoLeftEye,
        diary_photo_right_eye: result[i].diaryPhotoRightEye,
        diary_photo_left_ear: result[i].diaryPhotoLeftEar,
        diary_photo_right_ear: result[i].diaryPhotoRightEar,
        diary_photo_anal: result[i].diaryPhotoAnal,
        diary_photo_etc: result[i].diaryPhotoEtc,
        update_date: result[i].updateDate,
        delete_date: result[i].deleteDate,
        delete_status: result[i].deleteStatus,
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
