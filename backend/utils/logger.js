const log4js = require("log4js");

log4js.configure({
  appenders: {
    file: { type: "file", filename: "../backend/log/backend.log" },
    console: { type: "console" }
  },
  categories: {
    default: { appenders: ["file", "console"], level: "info" }
  }
});

module.exports = log4js.getLogger();