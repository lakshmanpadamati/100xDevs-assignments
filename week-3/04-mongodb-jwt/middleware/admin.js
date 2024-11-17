const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtPassword = process.env.JWTPASSWORD;
async function adminMiddleware(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if(!token)return res.status(404).json({message:"Sign into your account "})
  try {
    const verifed = jwt.verify(token, jwtPassword);
    const username = verifed.username;
    const admin = await Admin.findOne({ username });
    if (admin) {
      next();
    }
   else {
      throw new Error("not an admin,might be user");
    }
  } catch (err) {
    
    return res.status(404).json({ message: err.message });
  }
}

module.exports = adminMiddleware;
