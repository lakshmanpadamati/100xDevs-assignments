const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  balance: { type:Number,required:true },
});
const Account = new mongoose.model("Accounts", AccountSchema);
module.exports = Account;
