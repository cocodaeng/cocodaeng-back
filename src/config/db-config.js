/* DB Configuration */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// const dotenv = require("dotenv");

// dotenv.config();

module.exports = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
};
// module.exports = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
// };
