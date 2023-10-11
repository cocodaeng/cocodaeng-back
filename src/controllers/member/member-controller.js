const MemberService = require("../../services/member/member-service");
const HttpStatus = require("http-status");

// 특정 회원 조회
exports.findMember = async (req, res) => {
  const result = await MemberService.findMemberByNo(req.memberNo);
};
