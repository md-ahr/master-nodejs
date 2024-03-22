const shortid = require("shortid");
const URL = require("../models/URL");

const generateShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(404).json({ success: false, message: "Url is required" });
  }
  try {
    const shortId = shortid(24);
    const users = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });
    return res.render("home", { id: shortId });
    // return res.status(200).json({
    //   success: true,
    //   message: "Short url generated successfully",
    //   payload: { id: shortId },
    // });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getShortUrl = async (req, res) => {
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const result = await URL.findOne({ shortId: req.params.shortId });
    return res.status(200).json({
      success: true,
      payload: {
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { generateShortUrl, getShortUrl, getAnalytics };
