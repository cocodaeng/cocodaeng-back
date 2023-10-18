/* 다이어리 서비스 */
const getConnection = require("../../database/connection");
const DiaryRepository = require("../../repositories/diary/diary-repository");
const DiaryDTO = require("../../dto/diary-dto");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaryByNo = (petNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    const result = await DiaryRepository.findDiaryByNo(connection, petNo);

    if (result !== null) {
      // 조회 성공 시
      resolve(result);
      connection.commit();
    }
    if (result === null) {
      // 조회 실패 시
      reject(new Error("다이어리 전체 조회 실패"));
      connection.rollback();
    }
    connection.end();
  });
};
