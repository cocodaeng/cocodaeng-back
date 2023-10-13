const crypto = require("crypto");

const secretKey = crypto.randomBytes(64, (err, buf) => {
  if (err) {
    console.log(err);
  }
  buf.toString("base64");
});

module.exports = { secretKey };
