const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./../models/Users");
const z = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("./../middlewares/middleswares");
//schemas
const signupSchema = z.object({
  username: z.string().min(6, "username must be atleat of 6 characters"),
  password: z.string().min(8, "password must atleast of 8 characters"),
  firstname: z.string().min(3, "First name must contain atleast 3 characters "),
  lastname: z.string().min(3, "LastName must contain atleast 3 characters"),
});
const signinSchema = z.object({ username: z.string(), password: z.string() });
const updateSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  password: z.string().optional(),
});

//controllers
const signupcontroller = async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = signupSchema.safeParse(data);
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: "Invalid inputs please check inputs" });
  }
  try {
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      return res.status(409).json({ error: "Username Already Taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newuser = new User({ ...data, password: hashedPassword });
    const token = jwt.sign({ userId: newuser._id }, JWT_SECRET);
    await newuser.save();
    return res
      .status(201)
      .json({ token, message: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const loginController = async (req, res) => {
  const data = req.body;
  const result = signinSchema.safeParse(data);
  const { success } = result;
  if (!success) {
    return res.status(400).json({ error: "invalid input" });
  }
  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please check your password." });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res
      .status(200)
      .json({ token, message: "Authentication successful" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong from ourside" });
  }
};
const updateUser = async (req, res) => {
  const data = req.body;
  try {
    const { success } = updateSchema.safeParse(data);
    if (!success) {
      return res.status(400).json({ error: "invalid inputs" });
    }
    const userId = req.userId;
    if(data.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password=hashedPassword
    }
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    return res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

//route definitions
const findUsers = async (req,res) => {
  const filter = req.query.filter || "";
  try {
    const users = await User.find({
      $or: [
        { firstname: { $regex: filter, $options: "i" } },
        { lastname: { $regex: filter, $options: "i" } },
        { username: { $regex: filter, $options: "i" } }
      ],
   
    },'username firstname lastname ');
    return res.status(200).json({users})
  } catch (err) {
    return res.status(500).json({error:"something went wrong"})
  }
};
router
  .post("/signup", signupcontroller)
  .post("/login", loginController)
  .put("/update", authMiddleware, updateUser)
  .get("/bulk", authMiddleware, findUsers);

module.exports = router;
