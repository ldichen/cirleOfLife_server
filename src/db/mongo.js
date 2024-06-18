/*
 * @Description: mongodb数据库
 * @Author: DiChen Liu
 * @Date: 2024-05-22
 * @LastEditTime: 2024-05-22
 */

const mongoose = require("mongoose");

// MongoDB 连接 URI
const uri = "mongodb://localhost:27017/CircleOfLife";

// 连接到 MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // 退出进程
  }
};

// 导出连接函数
module.exports = connectDB;
