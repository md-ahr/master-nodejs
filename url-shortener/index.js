const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const flash = require("express-flash");
const app = require("./server");
const flashMessages = require("./middlewares/flashMessages");

const sessionStore = new session.MemoryStore();

const urlRouter = require("./routes/urlRouter");
const staticRouter = require("./routes/staticRouter");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({ secret: "your-secret-key", resave: false, saveUninitialized: true })
);
app.use(flash());
app.use(flashMessages);

app.use("/url", urlRouter);
app.use("/", staticRouter);
