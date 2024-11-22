const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "username must be unique"],
  },
  firstname: {
    type: String,
    trim: true,
    required: [true, "first name is required"],
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    minLength: [3, "password should be of minimum length 6"],
  },
  password: {
    trim: true,
    type: String,
    required: true,
    minLength: 3,
  },
});
const Users = new mongoose.model("Users", userSchema);
module.exports = Users;
