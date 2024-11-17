const fs = require("fs");

// read file asyncronously
// It accepts 3 parameters
const readfileCallBack = (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
};
fs.readFile("file.txt", "utf-8", readfileCallBack);



//Read file asyncronously

const data = fs.readFileSync("file.txt", "utf-8");
console.log(data);
