const { User } = require("../db");

async function userMiddleware(req, res, next) {

  const username = req.headers.username;
  const password = req.headers.password;
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(403).json({ message: "User not found" });
  }
  if (checkUser && checkUser.password == password) {
    next();
  }
  else{

      return res.status(404).json({ message: "User password wrong" });
  }
}

module.exports = userMiddleware;
