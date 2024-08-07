/*
 * @Description: 主入口
 * @Author: DiChen Liu
 * @Date: 2024-05-11
 * @LastEditTime: 2024-07-19 16:28:50
 */
const { HOST, PORT } = require("./config/config.default");
const express = require("express");
const app = express();
const cors = require("cors");
const baseFunc = require("./routes/baseFuncRouter.js");

//全局配置cors，后期修改
app.use(cors());
/**
 * 解析body参数
 * body (raw)
 * content-type (application/json)
 */
app.use(express.json());
//注册基础功能路由
app.use("/baseFunc", baseFunc);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
