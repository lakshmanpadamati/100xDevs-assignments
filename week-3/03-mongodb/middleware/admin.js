
const { Admin } = require("./../db/index");
async function adminMiddleware(req, res, next) {
 
  const username = req.headers.username;
  const password = req.headers.password;
  const checkAdmin = await Admin.findOne({ username });

  if (!checkAdmin) {
    return res.status(403).json({ message: "Admin not found" });
  }
  console.log(checkAdmin.password,password)
  if (checkAdmin && checkAdmin.password == password) {
    next();
  }
  else{

      return res.status(404).json({ message: "Admin password wrong" });
  }
}

module.exports = adminMiddleware;
