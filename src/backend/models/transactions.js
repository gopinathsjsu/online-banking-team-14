const mongoose= require('mongoose')

const transactionsSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    acc_no: Number,
    date:{
        type:  Date,
        default : Date.now
    }
})

const Transaction = mongoose.model("Transactions", transactionsSchema)
module.exports = Transaction