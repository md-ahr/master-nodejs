const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = require("./server");

const urlRouter = require("./routes/urlRouter");
const staticRouter = require("./routes/staticRouter");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);
app.use("/", staticRouter);
