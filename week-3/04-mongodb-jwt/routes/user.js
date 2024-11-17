const { Router } = require("express");
const router = Router();
require("dotenv").config();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwtPassword = process.env.JWTPASSWORD;
const jwt=require('jsonwebtoken')
router.post("/signup", async(req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser=await User.findOne({username})
    if(existingUser)
    {
      return res.status(404).json({message:"user already found,please signin"})
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(404);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found with this email" });
       
    if (user.password !== password) {
      return res.status(404).json({ message: "password is incorrect" });
    }
    const token = jwt.sign({ username }, jwtPassword);
   
    res.status(200).json({ token });

  } catch (err) {
    res.status(404).json({ message: "unable to send the token" });
  }
});
router.get("/courses", async (req, res) => {
  const AllCourses = await Course.find({});
  res.status(200).json({ courses: AllCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
  const { courseId } = req.params;
  const token=req.headers["authorization"].split(" ")[1]
  const payload=jwt.decode(token)
  
  const username = payload.username;

    const user = await User.findOne({ username });
    user.purchased.push(courseId);
    await user.save();
    return res.status(202).json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(404).json({ message: "unable to purchase this course" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const token=req.headers["authorization"].split(" ")[1]
    const payload=jwt.decode(token)
   
    const username=payload.username
    const user = await User.findOne({ username });
    const purchased=user.purchased
    return res.status(200).json({ purchasedCourses: purchased });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
