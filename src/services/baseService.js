/*
 * @Description: 服务基础类
 * @Author: DiChen Liu
 * @Date: 2024-05-16
 * @LastEditTime: 2024-05-16
 */
const connectDB = require("../db/mongo.js");
const Com = require("../models/comModel.js");
const Scores = require("../models/comScores.js");
const { queryPolygon } = require("../utils/mapboxAPI.js");
//点查询poi
const queryPoint = async (data) => {
  try {
    const queryPolygonRes = await queryPolygon(data);
    // const res = await axios.get(tdtAPI.getPolygonQuery(point));
    if (queryPolygonRes != undefined) {
      return queryPolygonRes;
    }
  } catch (e) {
    console.log(e);
  }
};
//查询单个住宅区
const queryOne = async (id) => {
  try {
    connectDB();
    const res = await Com.findOne({ id: id })
      .then((data) => {
        console.log("One record found in com:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error querying com data:", err);
      });
    return res;
  } catch (e) {
    console.log(e);
  }
};

//分页查询住宅区

//查询各住宅区评分
const queryScores = async () => {
  try {
    connectDB();
    const res = await Scores.find()
      .sort({ ["scores"]: -1 })
      .then((data) => {
        console.log("All records found in com:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error querying com data:", err);
      });
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { queryPoint, queryOne, queryScores };
