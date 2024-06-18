/*
 * @Description: 住宅区model
 * @Author: DiChen Liu
 * @Date: 2024-05-22
 * @LastEditTime: 2024-05-22
 */
const mongoose = require("mongoose");

// 定义 com Schema
const comSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  lat: { type: Number },
  lon: { type: Number },
  scores: { type: Number },
  POIs: { type: Object },
});

// 创建 Com 模型
const Com = mongoose.model("Com", comSchema, "communal");

// 导出 Com 模型
module.exports = Com;
