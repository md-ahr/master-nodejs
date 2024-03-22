const fs = require("fs");
const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
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
});

app.get("/", (req, res) => {
  res.setHeader("X-Client-Name", "Abdul Halim");
  console.log(`Name: ${res.getHeader("x-client-name")}`);
  console.log(`Hostname: ${req.headers.host}`);
  return res.send("working correctly");
});

// app.get("/about", (req, res) => {
//   return res.send(`Hello ${req.query.name}`);
// });

app
  .route("/api/users")
  .get((req, res) => {
    return res.status(200).json({ success: true, payload: users });
  })
  .post((req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
      if (error) {
        return res.status(400).json({ success: false, payload: error });
      }
      return res.status(201).json({
        success: true,
        message: "User created successfully!",
        payload: body,
      });
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const user = users.find((user) => user.id === +req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    return res.send("pending");
  })
  .delete((req, res) => {
    return res.send("pending");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
