/*
 * @Description: 业务异常通用code
 * @Author: DiChen Liu
 * @Date: 2024-05-15
 * @LastEditTime: 2024-05-15
 */
class BaseResultCode {
  /************************************/
  static SUCCESS = new BaseResultCode(true, 200, "成功");
  static UNKNOWN_ERROR = new BaseResultCode(false, 500, "未知错误");
  static PARAM_ERROR = new BaseResultCode(false, 400, "参数错误");
  static API_NOT_FOUNT = new BaseResultCode(false, 404, "接口不存在");
  static API_BUSY = new BaseResultCode(false, 700, "操作过于频繁");
  static NULL_POINT = new BaseResultCode(false, 20003, "空指针异常");
  static INDEX_OUT_OF_BOUNDS = new BaseResultCode(false, 20004, "下标越界异常");

  success;
  code;
  message;

  constructor(success, code, message) {
    this.success = success;
    this.code = code;
    this.message = message;
  }

  getSuccess() {
    return this.success;
  }

  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }
}
module.exports = BaseResultCode;
