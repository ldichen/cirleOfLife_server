/*
 * @Description: 统一返回结果
 * @Author: DiChen Liu
 * @Date: 2024-05-15
 * @LastEditTime: 2024-05-15
 */
const BRC = require("./BaseResultCode.js");
class BaseResult {
  success;
  // 状态码
  code;
  // 消息
  message;
  // 数据
  data;
  //时间
  time;

  // @param code 状态码
  // @param message 消息
  // @param data 数据

  static success() {
    const r = new BaseResult();
    r.setSuccess(BRC.SUCCESS.getSuccess());
    r.setMessage(BRC.SUCCESS.getMessage());
    r.setCode(BRC.SUCCESS.getCode());
    r.setTime(new Date());
    return r;
  }

  static fail() {
    const r = new BaseResult();
    r.setSuccess(BRC.UNKNOWN_ERROR.getSuccess());
    r.setMessage(BRC.UNKNOWN_ERROR.getMessage());
    r.setCode(BRC.UNKNOWN_ERROR.getCode());
    r.setTime(new Date().toLocaleString());

    return r;
  }

  Data(param) {
    this.setData(param);
    return this;
  }

  Message(message) {
    this.setMessage(message);
    return this;
  }

  Code(code) {
    this.setCode(code);
    return this;
  }
  /*************set get*************** */
  setSuccess(success) {
    this.success = success;
  }
  setCode(code) {
    this.code = code;
  }
  setData(data) {
    this.data = data;
  }
  setMessage(message) {
    this.message = message;
  }
  setTime(time) {
    this.time = time;
  }
}
module.exports = BaseResult;
