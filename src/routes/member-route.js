/* 회원 관련 경로 */
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const MemberController = require("../controllers/member/member-controller");
const PolicyController = require("../controllers/member/policy-controller");
const StartPage = require("../pages/start-page");

/* 회원 조회 라우터 - 조만제 */
router.get("/", auth, MemberController.findMember);

// Policy
router.get("/policyConsent", auth, PolicyController.findPolicyConsent); // 추 후 auth 미들웨어 추가 필요.
router.put(
  "/policyConsent/:policy_consent",
  auth,
  PolicyController.updatePolicyConsent
);

/* 서비스 이용약관 페이지 조회 - 조만제 */
router.get("/startPage", StartPage.getAgreeService);

module.exports = router;
