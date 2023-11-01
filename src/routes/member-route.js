/* 회원 관련 경로 */
import { Router } from "express";
const router = Router();
import { auth } from "../middleware/auth-middleware";
import { findMember } from "../controllers/member/member-controller";
import {
  findPolicyConsent,
  updatePolicyConsent,
} from "../controllers/member/policy-controller";
import { getAgreeService } from "../pages/start-page";

/* 회원 조회 라우터 - 조만제 */
router.get("/", auth, findMember);

// Policy
router.get("/policyConsent", auth, findPolicyConsent); // 추 후 auth 미들웨어 추가 필요.
router.put("/policyConsent/:policy_consent", auth, updatePolicyConsent);

/* 서비스 이용약관 페이지 조회 - 조만제 */
router.get("/startPage,", getAgreeService);

export default router;
