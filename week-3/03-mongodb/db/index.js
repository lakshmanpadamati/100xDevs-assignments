const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/udemy");

const AdminSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  purchased: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  imageLink: { type: String },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
module.exports = {
  Admin,
  User,
  Course,
};
