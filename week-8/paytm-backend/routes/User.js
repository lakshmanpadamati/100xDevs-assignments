const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./../models/Users");
const mongoose = require("mongoose");
const z = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { authMiddleware } = require("./../middlewares/middleswares");
const Account = require("../models/Accounts");

const signupSchema = z.object({
  email:z.string().email(),
  password: z.string().min(8, "password must atleast of 8 characters"),
  firstname: z.string().min(3, "First name must contain atleast 3 characters "),
  lastname: z.string().min(3, "LastName must contain atleast 3 characters"),
});
const signinSchema = z.object({ email: z.string(), password: z.string() });
const updateSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  password: z.string().optional(),
});

//controllers
const signupcontroller = async (req, res) => {
  const data = req.body;
 console.log(data)
 try {
    const result = signupSchema.safeParse(data);
    if (!result.success) {
     console.log(result.error)
      return res
        .status(400)
        .json({ error: "Invalid inputs please check inputs" });
    }
    const existingUser = await User.findOne({email: data.email });
    if (existingUser) {
      return res.status(409).json({ error: "Already have an account" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newuser = new User({ ...data, password: hashedPassword });
    const token = jwt.sign({ userId: newuser._id }, JWT_SECRET);
    await newuser.save();
    const amount = Math.floor(Math.random() * 10000) + 1;
    await Account.create({ userId: newuser._id, balance: amount });
    return res
      .status(201)
      .json({ token, message: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const loginController = async (req, res) => {
  console.log(req.body)
  const data = req.body;
  const {success} = signinSchema.safeParse(data);
  
 console.log(JWT_SECRET)
  if (!success) {
    return res.status(400).json({ error: "invalid input" });
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    console.log("before match")
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please check your password." });
    }
    console.log(user._id)
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

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    return res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

//route definitions
const findUsers = async (req, res) => {
  
  const filter = req.query.filter || "";
  console.log(req.userId)
  try {
    const users = await User.find(
      {
        $and: [
          {
            $or: [
              { firstname: { $regex: filter, $options: "i" } },
              { lastname: { $regex: filter, $options: "i" } },
              { email: { $regex: filter, $options: "i" } },
            ],
          },
          {
            _id: {
              $ne:req.userId,
            },
          },
        ],
      },
      "email firstname lastname "
    );
    console.log(users)
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
router
  .post("/signup", signupcontroller)
  .post("/login", loginController)
  .put("/update", authMiddleware, updateUser)
  .get("/bulk", authMiddleware, findUsers);

module.exports = router;
