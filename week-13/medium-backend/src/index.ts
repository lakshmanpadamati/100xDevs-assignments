import { NextFunction } from "express";

const middlewares = require("./middlewares/middlewares");
const blogControllers = require("./controllers/blogControllers");
const authControllers = require("./controllers/authControllers");
const UserControllers = require("./controllers/UserControllers");
const express = require("express");
const router = express.Router();
const cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json());

// Apply authentication middleware globally except for signup and login routes
router.get("/api/v1/user/me",middlewares.authMiddleware,UserControllers.getMyProfile)
  .post("/api/v1/signup", authControllers.signupcontroller)
  .post("/api/v1/signin", authControllers.loginController)
  .use(middlewares.authMiddleware) // Apply to all subsequent routes
  .get("/api/v1/blogs", blogControllers.getAllBlogs)
  .get("/api/v1/users", UserControllers.getUsers)
  .put("/api/v1/updatepassword", authControllers.updatePasswordController)
  .post("/api/v1/forgotpassword", authControllers.forgotPasswordController)
  .get("/api/v1/tags", blogControllers.getTags)
  .get("/api/v1/blogs/:blogId", blogControllers.getblog)
  .post("/api/v1/blogs", blogControllers.createBlog)
  .put("/api/v1/blogs/:blogId", middlewares.authorMiddleware, blogControllers.updateBlog)
  .delete("/api/v1/blogs/:blogId", middlewares.authorMiddleware, blogControllers.deleteblog)
  .post("/api/v1/toggle-friendship", UserControllers.toggleFriendship);

app.use("/", router);
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
