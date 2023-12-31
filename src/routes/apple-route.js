/* 애플 경로 */
const express = require("express");
const router = express.Router();
const AppleController = require("../controllers/oauth/apple-controller");

router.post("/", AppleController.appleLogin);

module.exports = router;
