const mongoose = require("mongoose");
const express = require("express");
const z = require("zod");
const { authMiddleware } = require("../middlewares/middleswares");
const Account = require("../models/Accounts");

const router = express.Router();
const getBalanceController = async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId });
    return res.status(200).json({ balance: account.balance });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong! try again" });
  }
};

const transferController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.userId;
    const { to, amount } = req.body;
  
    const sender = await Account.findOne({ userId }, {}, { session });
    if (!sender || sender.balance < amount) {
     await  session.abortTransaction();
      return res.status(400).json({ error: "Insufficient balance" });
    }
    
  
    const receiver = await Account.findOne({ userId:to },{} ,{session});
    if (!receiver) {
       
     await  session.abortTransaction();
      return res.status(400).json({ error: "Invalid receiver" });
    }
    //decrement the amount
    await Account.updateOne(
      { userId },
      { $inc: { balance: -amount } },
      { session }
    );
    //increment the amount
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: +amount } },
      { session }
    );
    //commit transaction
   await  session.commitTransaction();
    return res.status(200).json({ message: "Transaction successful" });
  } catch (err) {


   await  session.abortTransaction();
    return res.status(500).json({ error: "unable to send the money" });
  }
  finally{
  
   await session.endSession();
  }
};

module.exports=router
  .use(authMiddleware)
  .get("/balance", getBalanceController)
  .post("/transfer", transferController);
