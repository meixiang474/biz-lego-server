const router = require("koa-router")();
const { ENV } = require("../utils/env");
const packageInfo = require("../../package.json");
const testMysqlConn = require("../db/mysql2");
const { WorkModel } = require("../models/WorkModel");
const { cacheGet, cacheSet } = require("../cache/index");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

// 测试数据库连接
router.get("/api/db-check", async (ctx) => {
  // 测试 mysql 连接
  const mysqlRes = await testMysqlConn();
  // 测试 mongodb 连接
  let mongodbConn;
  try {
    mongodbConn = true;
    await WorkModel.findOne();
  } catch (e) {
    mongodbConn = false;
    console.error("mongdb connect error", e);
  }
  // 测试 redis 连接
  cacheSet("name", "biz editor server OK - by redis");
  const redisTestVal = await cacheGet("name");

  ctx.body = {
    errno: 0,
    data: {
      name: "biz-editor-server",
      version: packageInfo.version,
      ENV,
      mysqlConn: mysqlRes.length > 0,
      mongodbConn,
      redisConn: redisTestVal != null,
      // Dockerfile 的环境变量
      SERVER_NAME: process.env.SERVER_NAME,
      AUTHOR_NAME: process.env.AUTHOR_NAME,
    },
  };
});

module.exports = router;
