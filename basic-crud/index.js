const express = require("express");
const app = require("./server");

const logfile = require("./middlewares/logfile");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logfile);

app.get("/", (req, res) => {
  return res.send("working correctly");
});

app.use("/api/users", userRouter);
