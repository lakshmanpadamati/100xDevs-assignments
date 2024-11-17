const { User } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtPassword = process.env.JWTPASSWORD;
async function userMiddleware(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token)
    return res.status(404).json({ message: "Sign into your account " });
  try {
    const verifed = jwt.verify(token, jwtPassword);
    const username = verifed.username;
    const user = await User.findOne({ username });
    if (user) {
      next();
    } else {
      throw new Error("not a user, might be admin");
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

module.exports = userMiddleware;
