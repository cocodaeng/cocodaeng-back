/* 애플 서비스 */
const AppleRepository = require("../../repositories/oauth/apple-repository");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppleAuth = require("apple-auth");
const HttpStatus = require("http-status");

const appleKey = {
  client_id: "yourClientID",
  team_id: "yourTeamID",
  key_id: "yourKeyID",
  redirect_uri: "https://test.glitch.me/redirect", // 등록한 redirect URL
  scope: "name email",
};

/* 로컬일 시 env파일 실행 */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const appleAuth = new AppleAuth(
  appleKey,
  process.env.APPLE_PRIVATE_KEY_PATH,
  "text"
);

exports.appleLogin = (code, user) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      //authenticate our code we recieved from apple login with our key file
      const response = await appleAuth.accessToken(code);

      // decode our token
      const idToken = jwt.decode(response.id_token);

      const user = {};
      user.id = idToken.sub;
      const id = user.id;

      //extract email from idToken
      if (idToke.email) user.email = idToken.email;
      const email = user.email;

      //check if user exists in the returned response from Apple
      //Apple returns the user only once, so you might want to save their details
      // in a database for future logins

      if (user) {
        const { name } = JSON.parse(user);
        user.name = name; // name = { firstname: , lastname: }
        const username = name.lastname + name.firstname;

        const appleLoginUserInfo = await AppleRepository.registAppleMember(
          connection,
          id,
          username,
          email
        );

        // 등록 성공 시
        if (appleLoginUserInfo.affectedRows > 0) {
          connection.commit();
          resolve(appleLoginUserInfo);
        }
        // 등록 실패 시
        if (appleLoginUserInfo.affectedRows === 0) {
          connection.rollback();
          const error = new Error("애플 로그인 등록 실패하였습니다.");
          error.status = HttpStatus.BAD_REQUEST;
          reject(error);
        }
      }
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
