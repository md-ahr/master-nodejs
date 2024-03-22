const fs = require("fs");

const logfile = (req, res, next) => {
  if (req.path === "/favicon.ico" || req.path === "/firebase-messaging-sw.js") {
    return res.end();
  }
  const log = `${new Date().toLocaleString()} ${req.ip} ${req.method} ${
    req.path
  }\n`;
  fs.appendFile("./log.txt", log, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("File written successfully!");
  });
  next();
};

module.exports = logfile;
