const fs = require("fs");
const data = "this data is written using fs module";
fs.writeFile("file1.txt", data, "utf-8", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("file written successfully");
  }
});
