const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth-middleware");
const MemberController = require("../controllers/member/member-controller");
const PolicyController = require("../controllers/member/policy-controller");

// Member
router.get("/findMember", auth, MemberController.findMember);

// Policy
router.get("/policyConsent", auth, PolicyController.findPolicyConsent);
router.put(
  "/policyConsent/:policyConsent",
  auth,
  PolicyController.updatePolicyConsent
);

module.exports = router;
