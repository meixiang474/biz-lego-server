/**
 * @description dev配置
 */

module.exports = {
  // mysql连接配置
  mysqlConf: {
    host: "localhost",
    user: "root",
    password: "111",
    port: "3306",
    database: "icya_lego",
  },
  // mongodb连接配置
  mongodbConf: {
    host: "localhost",
    port: "27017",
    dbName: "icya_lego",
  },
  // refis 连接配置
  redisConf: {
    port: "6379",
    host: "127.0.0.1",
  },
  // jwt 过期时间
  jwtExpiresIn: "1d", // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
  // cors origin
  corsOrigin: "*",
};
