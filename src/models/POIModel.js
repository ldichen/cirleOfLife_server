/*
 * @Author: DiChen
 * @Date: 2024-07-03 10:48:18
 * @LastEditors: DiChen
 * @LastEditTime: 2024-07-03 11:18:29
 */
const mongoose = require("mongoose");

// 定义 POI Schema
const POISchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  firstClass: { type: String, required: true },
  secondClass: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  county: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// 创建 POI 模型
const POI = mongoose.model("POI", POISchema, "poi");

// 导出 POI 模型
module.exports = POI;
