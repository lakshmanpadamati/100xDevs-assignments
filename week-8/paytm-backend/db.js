const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/paytm";
module.exports = connectDB = () => {
  mongoose.connect(uri);
};
