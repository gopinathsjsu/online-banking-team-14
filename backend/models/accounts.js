const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accId: {
    type: Schema.Types.ObjectId, 
    
  },
  email:{
    type: String,
    required : true,
    ref: "customers" // how we associate each account with a user
  },
  accountType: {
    type: String
  },
  balance:{
    type: Number
    //required = true
  }
});

module.exports = Account = mongoose.model("Accounts", AccountSchema);