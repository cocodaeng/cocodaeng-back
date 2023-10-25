/* 다이어리 컨트롤러 */
const DiaryService = require("../../services/diary/diary-service");
const HttpStatus = require("http-status");
const DiaryDTO = require("../../dto/diary/diary-dto");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaries = async (req, res, next) => {
  const petNo = req.params.pet_no;
  try {
    const result = await DiaryService.findDiariesByPetNo(petNo);
    // 조회 성공 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "다이어리 전체 조회 성공",
      data: result,
    });
  } catch (err) {
    // 에러 발생 or 조회 실패 시
    err.links = [
      {
        rel: "findDiaries",
        method: "GET",
        href: `api/v1/diary/${petNo}`,
      },
    ];
    next(err);
  }
};

/* 다이어리 번호로 다이어리 조회 - 김종완 */
exports.findDiaryByDiaryNo = async (req, res, next) => {
  const diaryNo = req.params.diary_no;

  try {
    const result = await DiaryService.findDiaryByDiaryNo(diaryNo);
    // 정상 조회 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      data: {
        diary_no: result[0].diary_no,
        pet_no: result[0].pet_no,
        pet_program_no: result[0].pet_program_no,
        diary_content: result[0].diary_content,
        fodder_name: result[0].fodder_name,
        pet_health: result[0].pet_health,
        diary_photo_left_eye: result[0].diary_photo_left_eye,
        diary_photo_right_eye: result[0].diary_photo_right_eye,
        diary_photo_left_ear: result[0].diary_photo_left_ear,
        diary_photo_right_ear: result[0].diary_photo_right_ear,
        diary_photo_anal: result[0].diary_photo_anal,
        diary_photo_etc: result[0].diary_photo_etc,
        create_date: result[0].create_date,
        update_date: result[0].update_date,
        diary_status: result[0].diary_status,
      },
    });
  } catch (err) {
    err.links = [
      {
        rel: "findDiaryByDiaryNo",
        method: "GET",
        href: `api/v1/diary/${diaryNo}`,
      },
    ];
    next(err);
  }
};

/* 다이어리 신규 등록 - 김종완 */
exports.createDiary = async (req, res, next) => {
  try {
    const createDTO = DiaryDTO.fromCreateDiary(
      req.body.diary_no,
      req.body.pet_no,
      req.body.pet_program_no,
      req.body.diary_content,
      req.body.fodder_name,
      req.body.pet_health,
      req.files[0].pathc,
      req.files[1].path,
      req.files[2].path,
      req.files[3].path,
      req.files[4].path,
      req.files[5].path
    );
    const result = await DiaryService.createDiary(createDTO);
    // 등록 성공 시
    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: "정상적으로 등록되었습니다.",
      data: {
        diary_no: result.insertId,
      },
    });
  } catch (err) {
    err.links = [
      {
        rel: "createDiary",
        method: "POST",
        href: "api/v1/diary",
      },
    ];
    next(err);
  }
};

/* 다이어리 수정 - 김종완 */
exports.updateDiary = async (req, res, next) => {
  console.log(req);
  try {
    const updateDTO = DiaryDTO.fromUpdateDiary(
      req.params.diary_no,
      req.body.pet_no,
      req.body.pet_program_no,
      req.body.diary_content,
      req.body.fodder_name,
      req.body.pet_health,
      req.files[0].path,
      req.files[1].path,
      req.files[2].path,
      req.files[3].path,
      req.files[4].path,
      req.files[5].path,
      req.body.create_date,
      req.body.diary_status
    );
    const result = await DiaryService.updateDiary(updateDTO);
    console.log("다이어리 result : ", result);
    // 수정 성공 시
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 수정되었습니다.",
      data: result.message,
    });
  } catch (err) {
    err.links = [
      {
        rel: "updateDiary",
        method: "PUT",
        href: `api/v1/diary/${req.params.diary_no}`,
      },
    ];
    next(err);
  }
};

/* 다이어리 삭제(상태 값 변경) - 김종완 */
exports.deleteDiary = async (req, res, next) => {
  const diaryNo = req.params.diary_no;
  try {
    const result = await DiaryService.deleteDiary(diaryNo);
    console.log("diary controller deleteDiary result : ", result);
    // 삭제 상태 변경 성공 시
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "정상적으로 삭제되었습니다",
        data: result.message,
      });
    }
  } catch (err) {
    console.log("error");
    err.links = [
      {
        rel: "deleteDiary",
        method: "DELETE",
        href: `api/v1/diary/${diaryNo}`,
      },
    ];
    next(err);
  }
};
