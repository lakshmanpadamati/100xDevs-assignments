const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

router.post("/signup", (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(404);
  }
});

router.get("/courses", async (req, res) => {
  const AllCourses = await Course.find({});
  res.status(200).json({ courses: AllCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const username = req.headers.username;
  console.log(username);
  try {
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
    const username = req.headers.username;
    const user = await User.findOne({ username });
    const purchased = user.purchased;
    return res.status(200).json({ purchasedCourses: purchased });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = router;
