/* 서비스 약관 시작 페이지 */
import { OK } from "http-status";

/* 서비스 이용약관 조회 메소드 - 조만제 */
export function getAgreeService(req, res, next) {
  res.status(OK).send({
    status: OK,
    message: "서비스 이용약관 조회 성공",
    data: {},
  });
}
