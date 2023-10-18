/* 다이어리 레포지토리 */
const DiaryQuery = require("../../database/diary/diary-query");

/* 다이어리 전체 조회 메소드 - 조만제 */
exports.findDiaryByNo = (connection, petNo) => {
  return new Promise((resolve, reject) => {
    connection.query(DiaryQuery.findDiaryByNo(), [petNo], (err, result) => {
      if (err) {
        console.log("error: " + err);
        reject(err);
      }
      console.log("result" + result);
      resolve(result);
    });
  });
};
