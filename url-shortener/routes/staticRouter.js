const express = require("express");
const URL = require("../models/URL");

const router = express.Router();

router.get("/", async (req, res) => {
  const limit = 5;
  const page = req.query.page || 1;
  const searchText = req.query.search || "";
  let query = {};
  if (searchText) {
    query = { $text: { $search: searchText } };
  }
  const allUrls = await URL.find(query)
    .sort({ _id: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const totalUrlsCount = await URL.countDocuments({});
  const totalPages = Math.ceil(totalUrlsCount / limit);
  return res.render("home", {
    urls: allUrls,
    skip: (page - 1) * limit,
    total: totalUrlsCount,
    currentPage: parseInt(page),
    totalPages: totalPages,
    expressFlash: req.flash("success"),
    sessionFlash: res.locals.sessionFlash,
  });
});

module.exports = router;
