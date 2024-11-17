const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(200).json({ message: "Admin created successfully" });
  } catch (err) {
    return res.status(404);
  }
});
router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;
    const newCourse = new Course({ title, description, imageLink, price });
    await newCourse.save();
    res
      .status(200)
      .json({
        message: "Course created successfully",
        courseId: newCourse._id,
      });
  } catch (err) {}
});
router.get("/courses", adminMiddleware, async(req, res) => {
    const AllCourses=await Course.find({});
    res.status(200).json({courses:AllCourses})
});

module.exports = router;
