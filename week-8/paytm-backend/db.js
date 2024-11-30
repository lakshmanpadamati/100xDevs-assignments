const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/paytm?replicaSet=rs";

module.exports = connectDB = () => {
  mongoose.connect(uri).then(con=>{
    console.log("connected")
  }).catch(err=>{
    console.log("not connecte ")
    console.log(err)
  });
};
