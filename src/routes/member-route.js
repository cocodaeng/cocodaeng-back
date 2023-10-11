const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/member/member-controller");
const PolicyController = require("../controllers/member/policy-controller");

// Member
router.get("/findMember", MemberController.findMember);

// Policy
router.get("/policyConsent", PolicyController.findPolicyConsent);
router.put(
  "/policyConsent/:policyConsent",
  PolicyController.updatePolicyConsent
);

module.exports = router;
