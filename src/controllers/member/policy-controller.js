const HttpStatus = require("http-status");
const jwtDecode = require("../../utils/jwt-decoder");
const PolicyService = require("../../services/member/policy-service");
const PolicyUpdateRequestDTO = require("../../dto/member/request/policy-update-request-dto");

/**
 * 사용자가 로그인 후에 이용 정책 동의를 했는 지를 판단하여
 * 이용정책 동의 화면으로 이동할 지 여부 판단하는 기능
 * @param {req.headers} token
 * @return {success} status, message, policyConsent
 * @return {error} status, message
 */
exports.findPolicyConsent = async (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  const memberNo = jwtDecode.getMemberNoFromToken(token);
  console.log("findPolicyConsent 메소드 안에 memberNo", memberNo);
  const result = await PolicyService.findPolicyConsent(memberNo);
  // console.log("findPolcyConsent 컨트롤러 result : ", result[0].policyConsent);
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 조회되었습니다.",
      policyConsent: result[0].policyConsent,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "일치하는 회원이 존재하지 않습니다.",
      policyConsent: result,
    });
  }
};

/**
 * 사용자가 이용 정책 동의 화면에서 '동의'여부에 따른
 * policyConsent 상태 값 변경해주는 기능
 * @param {req.headers} req JWT
 * @return {success} status, message, policyConsent
 * @return {error} status, message
 */
exports.updatePolicyConsent = async (req, res) => {
  const token = req.headers.token;
  const memberNo = jwtDecode.getMemberNoFromToken(token);
  const policyConsent = req.params.policyConsent;

  // PolicyConsent 유효성 검증
  PolicyService.checkValidPolicyConsent(policyConsent);

  const result = await PolicyService.updatePolicyConsent(
    new PolicyUpdateRequestDTO(memberNo, policyConsent)
  );
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "정상적으로 수정되었습니다.",
      policyConsent: result.policyConsent,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "예기치 못한 오류가 발생하였습니다.",
    });
  }
};
