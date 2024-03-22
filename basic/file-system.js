const fs = require("fs");

fs.mkdir("./public/files/", { recursive: true }, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Directory created successfully!");
});

fs.writeFile("./public/files/text.txt", "hello node!", (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("File written successfully!");
});

fs.readFile("./public/files/text.txt", "utf-8" (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data.toString());
});

fs.appendFile("./public/files/text.txt", "hello node!\n", (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("File written successfully!");
});

fs.unlink("./public/files/text.txt", (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("File deleted successfully!");
});

console.log(fs.statSync("./public/files/text.txt"));

console.log(fs.statSync("./public/files/text.txt").isFile());
