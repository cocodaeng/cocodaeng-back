const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const MemberController = require("../controllers/member/member-controller");
const PolicyController = require("../controllers/member/policy-controller");

// 회원 조회
router.get("/findMember", auth, MemberController.findMember);

// Policy
router.get("/policyConsent", auth, PolicyController.findPolicyConsent);
router.put(
  "/policyConsent/:policyConsent",
  auth,
  PolicyController.updatePolicyConsent
);

module.exports = router;
