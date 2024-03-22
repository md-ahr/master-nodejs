const express = require("express");
const {
  generateShortUrl,
  getShortUrl,
  getAnalytics,
} = require("../controllers/urlController");

const urlRouter = express.Router();

urlRouter.route("/").post(generateShortUrl);

urlRouter.route("/:shortId").get(getShortUrl);

urlRouter.route("/analytics/:shortId").get(getAnalytics);

module.exports = urlRouter;
