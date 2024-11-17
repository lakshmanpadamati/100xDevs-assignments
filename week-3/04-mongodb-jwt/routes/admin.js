const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
require("dotenv").config();
const router = Router();
const jwtPassword = process.env.JWTPASSWORD;

const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(404)
        .json({ message: "Admin already found, Please signin" });
    }
    const admin = new Admin({ username, password });
    await admin.save();
   return  res.status(200).json({ message: "Admin created successfully" });
  } catch (err) {
    return res.status(404);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      return res.status(404).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ username }, jwtPassword);
    res.status(200).json({ token });
  } catch (err) {
    res.status(404).json({ message: "unable to send the token" });
  }
});
router.post("/courses", adminMiddleware, async (req, res) => {
  try {
   
    const { title, description, imageLink, price } = req.body;
    const newCourse = new Course({ title, description, imageLink, price });
    
    await newCourse.save();
  
    return res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (err) {}
});
router.get("/courses", adminMiddleware, async (req, res) => {
  const AllCourses = await Course.find({});
 return  res.status(200).json({ courses: AllCourses });
});

module.exports = router;
