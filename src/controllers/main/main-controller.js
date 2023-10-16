const MainService = require("../../services/main/main-service");
const HttpStatus = require("http-status");

// 홈 화면 조회
exports.findMainPage = async (req, res) => {
  const result = await MainService.findMainPage(1);
  let pet_data = [];

  if (result !== null) {
    for (let i = 0; i < result.length; i++) {
      pet_data[i] = {
        pet_program_no: result[i].pet_program_no,
        program_no: result[i].program_no,
        pet_no: result[i].pet_no,
        program_name: result[i].program_name,
        pet_start_date: result[i].pet_start_date,
        pet_end_date: result[i].pet_end_date,
        program_seventh_date: result[i].program_seventh_date,
        program_fourteenth_date: result[i].program_fourteenth_date,
        program_result: result[i].program_result,
        diary_no: result[i].diary_no,
        diary_content: result[i].diary_content,
        fodder_name: result[i].fodder_name,
        create_date: result[i].create_date,
        pet_status: result[i].pet_status,
        diary_photo_left_eye: result[i].diary_photo_left_eye,
        diary_photo_right_eye: result[i].diary_photo_right_eye,
        diary_photo_left_ear: result[i].diary_photo_left_ear,
        diary_photo_right_ear: result[i].diary_photo_right_ear,
        diary_photo_anal: result[i].diary_photo_anal,
        diary_photo_etc: result[i].diary_photo_etc,
        update_date: result[i].update_date,
        delete_date: result[i].delete_date,
        delete_status: result[i].delete_status,
      };
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "홈 화면 조회 성공",
      pet_data: pet_data,
    });
  }
  if (result === null) {
    res.status(HttpStatus.NOT_FOUND).send({
      status: HttpStatus.NOT_FOUND, // 404
      message: "홈 화면 조회 실패",
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
