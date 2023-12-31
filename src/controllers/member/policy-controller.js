const HttpStatus = require("http-status");
const JwtDecode = require("../../utils/jwt-decoder");
const PolicyService = require("../../services/member/policy-service");
const PolicyUpdateRequestDTO = require("../../dto/policy-update-request-dto");
const { nextTick } = require("process");

/**
 * 사용자가 로그인 후에 이용 정책 동의를 했는 지를 판단하여
 * 이용정책 동의 화면으로 이동할 지 여부 판단하는 기능
 * @param {req.headers} token
 * @return {success} status, message, policyConsent
 * @return {error} status, message
 */
/* 회원 번호로 이용 정책 동의 여부 조회 - 김종완 */
exports.findPolicyConsent = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecode.getMemberNoFromToken(token);
    console.log("findPolicyConsent 메소드 안에 memberNo", memberNo);
    const result = await PolicyService.findPolicyConsent(memberNo);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 조회되었습니다.",
      data: result[0],
    });
  } catch (err) {
    err.links = [
      {
        rel: "findPolicyConsent",
        method: "GET",
        href: `api/v1/member/policyConsent`,
      },
    ];
    // 에러 핸들링 미들웨어로 전달.
    next(err);
  }
};

/**
 * 사용자가 이용 정책 동의 화면에서 '동의'여부에 따른
 * policyConsent 상태 값 변경해주는 기능
 * @param {req.headers} req JWT
 * @return {success} status, message, policyConsent
 * @return {error} status, message
 */
/* 회원 번호로 이용 정책 동의 여부 업데이트 - 김종완 */
exports.updatePolicyConsent = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const memberNo = JwtDecode.getMemberNoFromToken(token);
    const policyConsent = req.params.policy_consent;

    // PolicyConsent 유효성 검증, 실패 시 에러 발생으로 자동 핸들링
    await PolicyService.checkValidPolicyConsent(policyConsent);

    const result = await PolicyService.updatePolicyConsent(
      new PolicyUpdateRequestDTO(memberNo, policyConsent)
    );
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 수정되었습니다.",
    });
  } catch (err) {
    err.links = [
      {
        rel: "updatePolicyConsent",
        method: "PUT",
        href: `api/v1/member/policyConsent/${policyConsent}`,
      },
    ];
    next(err);
  }
};
