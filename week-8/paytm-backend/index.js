const express = require("express");
const User = require("./models/Users");
const connectDB = require("./db");
const userroute=require("./routes/User")
const Users = require("./models/Users");
const AccountRoute=require("./routes/Accounts")
const cors=require('cors')
const app = express();
app.use(cors())

app.use(express.json());
connectDB();

app.use("/api/v1/user",userroute)
app.use("/api/v1/account",AccountRoute)
app.get("/",(req,res)=>{
   
})
app.listen(8000);
