/*
 * @Description: 住宅区评分
 * @Author: DiChen Liu
 * @Date: 2024-05-23
 * @LastEditTime: 2024-05-23
 */

const mongoose = require("mongoose");

// 定义 com Schema
const scoresSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  com_id: { type: Number, required: true },
  name: { type: String, required: true },
  scores: { type: Number },
});

// 创建 Com 模型
const Scores = mongoose.model("Scores", scoresSchema, "scores");

// 导出 Com 模型
module.exports = Scores;
