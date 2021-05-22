/**
 * @description 连接redis
 */

const redis = require("redis");
const { redisConf } = require("../config/index");

// 创建客户端
const { port, host, password } = redisConf;
const opt = {};
if (password) {
  opt.password = password;
}
const redisClient = redis.createClient(port, host, opt);
redisClient.on("error", (err) => {
  console.error("redis connect error", err);
});

module.exports = redisClient;
