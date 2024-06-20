/*
 * @Description: 控制器-基础功能
 * @Author: DiChen Liu
 * @Date: 2024-05-11
 * @LastEditTime: 2024-06-20 18:42:57
 */
const { escape } = require("querystring");
const BaseResult = require("../common/BaseResult.js");
const tdtAPI = require("../tdtAPI/tdtapi.js");
const baseService = require("../services/baseService.js"); //服务基础类service
//查询某一个点的范围
const queryPoint = async (req, res) => {
  let data = req.query;
  console.log("data", data);
  const { lon = "", lat = "", profile = "" } = data;
  try {
    if (!lon || !lat || !profile) {
      res.json(BaseResult.fail().Message("信息有误！"));
    } else {
      //这里写查询接口
      let result = await baseService.queryPoint(data);
      res.json(BaseResult.success().Data(result));
    }
  } catch (e) {
    res.json(BaseResult.fail().Message("发生错误：" + e));
  }
};
//查询单个住宅区
const queryOne = async (req, res) => {
  try {
    let data = req.body;
    let result = await baseService.queryOne(data.id);
    res.json(BaseResult.success().Data(result));
  } catch (e) {
    res.json(BaseResult.fail().Message("发生错误：" + e));
  }
};
//查询所有住宅区
const queryAll = async (req, res) => {
  try {
    res.json(BaseResult.success().Data("已经查询到了"));
  } catch (e) {
    res.json(BaseResult.fail().Message("发生错误：" + e));
  }
};

//查询各住宅区评分
const queryScores = async (req, res) => {
  try {
    let result = await baseService.queryScores();
    res.json(BaseResult.success().Data(result));
  } catch (e) {
    res.json(BaseResult.fail().Message("发生错误：" + e));
  }
};

module.exports = { queryPoint, queryOne, queryAll, queryScores };
