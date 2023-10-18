/* 다이어리 컨트롤러 */
const DiaryService = require("../../services/diary/diary-service");
const HttpStatus = require("http-status");
const DiaryDTO = require("../../dto/diary/diary-dto");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaries = async (req, res) => {
  const result = await DiaryService.findDiariesByPetNo(1);
  let diaries = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      diaries[i] = {
        diary_no: result[i].diaryNo,
        pet_no: result[i].petNo,
        pet_program_no: result[i].petProgramNo,
        diary_content: result[i].diaryContent,
        fodder_name: result[i].fodderName,
        pet_status: result[i].petStatus,
        diary_photo_left_eye: result[i].diaryPhotoLeftEye,
        diary_photo_right_eye: result[i].diaryPhotoRightEye,
        diary_photo_left_ear: result[i].diaryPhotoLeftEar,
        diary_photo_right_ear: result[i].diaryPhotoRightEar,
        diary_photo_anal: result[i].diaryPhotoAnal,
        diary_photo_etc: result[i].diaryPhotoEtc,
        create_date: result[i].createDate,
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

/* 다이어리 번호로 다이어리 조회 - 김종완 */
exports.findDiaryByDiaryNo = async (req, res, next) => {
  const diaryNo = req.params.diaryNo;
  const result = await DiaryService.findDiaryByDiaryNo(diaryNo);
  // 정상 조회 시
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: {
        diaryNo: result[0].diary_no,
        petNo: result[0].pet_no,
        petProgramNo: result[0].pet_program_no,
        diaryContent: result[0].diary_content,
        fodderName: result[0].fodder_name,
        petStatus: result[0].pet_status,
        diaryPhotoLeftEye: result[0].diary_photo_left_eye,
        diaryPhotoRightEye: result[0].diary_photo_right_eye,
        diaryPhotoLeftEar: result[0].diary_photo_left_ear,
        diaryPhotoRightEar: result[0].diary_photo_right_ear,
        diaryPhotoAnal: result[0].diary_photo_anal,
        diaryPhotoEtc: result[0].diary_photo_etc,
        createDate: result[0].create_date,
      },
    });
  }
  // 조회 실패 시
  if (!result) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "조회에 실패하였습니다.",
      result: [],
      links: [
        {
          rel: "findDiaryByDiaryNo",
          method: "GET",
          href: `api/v1/diary/${diaryNo}`,
        },
      ],
    });
  }
};

/* 다이어리 신규 등록 - 김종완 */
exports.createDiary = async (req, res, next) => {
  // console.log("request Body : ", req.body);
  // console.log("키 값 : ", req.body.diaryNo);
  // console.log("request files : ", req.files[0].path);
  const createDTO = DiaryDTO.fromCreateDiary(
    req.body.diaryNo,
    req.body.petNo,
    req.body.petProgramNo,
    req.body.diaryContent,
    req.body.fodderName,
    req.body.petStatus,
    req.files[0].path,
    req.files[1].path,
    req.files[2].path,
    req.files[3].path,
    req.files[4].path,
    req.files[5].path
  );
  try {
    const result = await DiaryService.createDiary(createDTO);
    // 등록 성공 시
    if (result) {
      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: "정상적으로 등록되었습니다.",
        result: {
          diaryNo: result.insertId,
        },
      });
    }
    // DB 반영이 안 되었을 때(요청 변수가 잘못되었을 때)
    if (result.affectedRows === 0) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "등록에 실패하였습니다.",
        result: [],
        links: [
          {
            rel: "createDiary",
            method: "POST",
            href: `api/v1/diary`,
          },
        ],
      });
    }
  } catch (err) {
    // 에러 발생 시
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      result: [],
      links: [
        {
          rel: "createDiary",
          method: "POST",
          href: "api/v1/diary",
        },
      ],
    });
  }
};

/* 다이어리 수정 - 김종완 */
exports.updateDiary = async (req, res, next) => {
  console.log(req);
  const updateDTO = DiaryDTO.fromUpdateDiary(
    req.params.diaryNo,
    req.body.petNo,
    req.body.petProgramNo,
    req.body.diaryContent,
    req.body.fodderName,
    req.body.petStatus,
    req.files[0].path,
    req.files[1].path,
    req.files[2].path,
    req.files[3].path,
    req.files[4].path,
    req.files[5].path,
    req.body.createDate,
    req.body.deleteStatus
  );
  try {
    const result = await DiaryService.updateDiary(updateDTO);
    // 수정 성공 시
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "정상적으로 수정되었습니다.",
        result: [],
      });
    }
    // 수정 실패 시
    if (result.affectedRows === 0) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "잘못된 요청입니다.",
        result: [],
        links: [
          {
            rel: "updateDiary",
            method: "PUT",
            href: `api/v1/diary/${req.params.diaryNo}`,
          },
        ],
      });
    }
  } catch (err) {
    // 과정 중 에러 발생 시
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      links: [
        {
          rel: "updateDiary",
          method: "PUT",
          href: `api/v1/diary/${req.params.diaryNo}`,
        },
      ],
    });
  }
};

/* 다이어리 삭제(상태 값 변경) - 김종완 */
exports.deleteDiary = async (req, res, next) => {
  const diaryNo = req.params.diaryNo;
  try {
    const result = await DiaryService.deleteDiary(diaryNo);
    console.log("diary controller deleteDiary result : ", result);
    // 삭제 상태 변경 성공 시
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "정상적으로 삭제되었습니다",
        result: [],
      });
    }
    // 삭제 상태 변경 실패 시
    if (result.affectedRows === 0) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "잘못된 요청입니다.",
        result: [],
        links: [
          {
            rel: "deleteDiary",
            method: "DELETE",
            href: `api/v1/diary/${diaryNo}`,
          },
        ],
      });
    }
  } catch (err) {
    // 과정 중 에러 발생 시
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      result: [],
      links: [
        {
          rel: "deleteDiary",
          method: "DELETE",
          href: `api/v1/diary/${diaryNo}`,
        },
      ],
    });
  }
};
