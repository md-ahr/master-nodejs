const http = require("http");
const fs = require("fs");
const url = require("url");

const handler = (req, res) => {
  if (req.url === "/favicon.ico" || req.url === "/firebase-messaging-sw.js") {
    return res.end();
  }
  const log = `${Date.now()}: ${req.method} ${req.url}\n`;
  const myUrl = url.parse(req.url, true);
  fs.appendFile("./log.txt", log, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("File written successfully!");
  });
  switch (myUrl.pathname) {
    case "/":
      res.end("home page");
      break;
    case "/about":
      const name = myUrl.query.name;
      res.end(`Hi ${name}`);
      break;
    case "/login":
      if (req.method === "GET") {
        res.end("login form page");
      } else if (req.method === "POST") {
        // DB query
        res.end("User logged in successfully!");
      }
      break;
    default:
      res.end("not found");
      break;
  }
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
