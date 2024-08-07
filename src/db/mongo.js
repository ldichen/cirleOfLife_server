/*
 * @Description: mongodb数据库
 * @Author: DiChen Liu
 * @Date: 2024-05-22
 * @LastEditTime: 2024-07-19 16:24:55
 */
const { DB_HOST, DB_PORT, DB_NAME } = require("../config/config.default");
const mongoose = require("mongoose");
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// 连接到 MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
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
