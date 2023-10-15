const MainQuery = require("../../database/main/main-query");

// 홈 화면 조회
exports.findMainPage = (connection, petNo, targetMonth) => {
  return new Promise((resolve, reject) => {
    connection.query(
      MainQuery.findMainPage(),
      [petNo, targetMonth],
      (err, result) => {
        if (err) {
          console.log("error: " + err);
          reject(err);
        }
        console.log("result" + result);
        resolve(result);
      }
    );
  });
};
