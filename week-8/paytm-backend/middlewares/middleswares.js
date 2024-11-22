require('dotenv').config()
const JWT_SECRET=process.env.JWT_SECRET
const jwt=require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authentication required. Please log in." });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication required. Please log in." });
    }
    try {
      const decoded=jwt.verify(token, JWT_SECRET);
      req.userId=decoded.userId
      console.log("next called")
      next();
    } catch (err) {
      console.log(err)
      return res.status(401).json({ error: "Invalid token" });
    }
  };
  module.exports={authMiddleware}