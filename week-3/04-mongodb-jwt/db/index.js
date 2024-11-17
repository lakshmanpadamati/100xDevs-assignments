const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') })
// Connect to MongoDB
mongoose.connect(process.env.DBURL);

const AdminSchema = new mongoose.Schema({
  username: { type: String,required:true  },
  password: { type: String ,required:true },
});

const UserSchema = new mongoose.Schema({
  username: { type: String,required:true },
  password: { type: String,required:true  },
  purchased: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String ,required:true },
  description: { type: String ,required:true },
  price: { type: Number ,required:true },
  imageLink: { type: String ,required:true },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
module.exports = {
  Admin,
  User,
  Course,
};
