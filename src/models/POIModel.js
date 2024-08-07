/*
 * @Author: DiChen
 * @Date: 2024-07-03 10:48:18
 * @LastEditors: DiChen
 * @LastEditTime: 2024-07-19 15:59:34
 */
const mongoose = require("mongoose");

// 定义 POI Schema
const POISchema = new mongoose.Schema(
  {
    NID: { type: Number, required: true },
    NAME: { type: String, required: true },
    type: { type: String, required: true },
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
  },
  { versionKey: false }
);

// 创建 POI 模型
const POI = mongoose.model("POI", POISchema, "poi");

// 导出 POI 模型
module.exports = POI;
