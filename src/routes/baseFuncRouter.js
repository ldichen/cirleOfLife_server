/*
 * @Description: API-基础功能
 * @Author: DiChen Liu
 * @Date: 2024-05-11
 * @LastEditTime: 2024-05-11
 */

const express = require("express");
const {
  queryPoint,
  queryOne,
  queryAll,
  queryScores,
} = require("../controllers/baseFuncControllers.js");

const baseFuncRouter = express.Router();

baseFuncRouter.get("/queryPoint", queryPoint);
baseFuncRouter.get("/queryOne", queryOne);
baseFuncRouter.get("/queryAll", queryAll);
baseFuncRouter.get("/queryScores", queryScores);

module.exports = baseFuncRouter;
