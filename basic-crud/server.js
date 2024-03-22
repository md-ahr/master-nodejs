const express = require("express");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server running on port ${PORT}`);
  } else {
    connectDB();
    console.log(`Server running on port ${PORT}`);
  }
});

module.exports = app;
