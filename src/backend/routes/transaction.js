const express = require('express')
const router = express.Router()
const Transactions = require('../models/transactions')
const Accounts = require('../models/accounts')
const Recurrings = require('../models/recurring')
const Recurring = require('../models/recurring')

// Getting all
function createDate(days, months, years) {
  var date = new Date(); 
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;    
}
router.get('/SeeAllTransactions', async (req, res) => {
    const transactions = await Transactions.find({})
    res.send(transactions.filter(transaction => transaction.date >= createDate(-1, 0, 0)))
})



// Getting one
//router.get('/:id', (req,res) =>{
  //  res.send(req.params.id)
//})
//Creating one.. will use this later
//router.post('/', async (req, res) => {
  //  const newTransaction = new Transaction(req.body)
   // await newTransaction.save()
    //res.send("The transaction was saved")
//})

async function balanceAmount() {
  await Accounts.findOne({accNum: req.body.srcAcc}, await function (err, docs) {
 //console.log(docs)
    let x= (err) ? err : docs?.balance
    console.log(x)
    return x
  })
 return true

}
router.post('/makeATransaction', async (req, res) => {
   
   
  
      if (req.body.amount<= 0) {
         return res.status(404).send({
          message: "Amount should be greater than Zero "
        })}
        
      if (req.body.srcAcc === null || req.body.srcAcc === "") {
        return res.status(404).send({
          message: "Source account cannot be empty "
      })}
      if (req.body.tgtAcc === null || req.body.tgtAcc === "") {
        return res.status(404).send({
          message: "Target account cannot be empty "
      })}
      if (req.body.tgtAcc === req.body.srcAcc){
        return res.status(404).send({
          message: "Source account and target account cannot be same "
      })
      }
      
    
//=======================      
else{
  await Accounts.findOne({accNum: req.body.srcAcc}, await function (err, docs) {
  if(err){
    res.status(500).send(err);
  }
  else{
    
    if(docs.balance< req.body.amount){
      console.log("he",docs.balance)
      return res.status(404).send({
        message: "Insufficient balance "
    })
  }
}  
}  ) 
     
     
      //Check if balance is suffiencient
     
      
      // Deduct Balance from Source account
        Accounts.findOne({accNum: req.body.srcAcc}, function (err, docs) {
        if(err){
          console.log(err);
        }
        else{
          let changebal = parseFloat(docs?.balance) - parseFloat(req.body.amount);
          Accounts.updateOne({accNum: req.body.srcAcc},
            {balance: changebal}, function(err,udocs) {
              if(err) {
                console.log(err);
              }else {
                console.log("Updated Balance: ", udocs )
              }
            });
            console.log("sub",docs.balance, changebal);
          console.log(parseFloat(docs.balance) - parseFloat(req.body.amount));
        }
      })
      //Add amount to target account
      Accounts.findOne({accNum: req.body.tgtAcc}, function (err, docs) {
        if(err){
          console.log(err);
        }
        else{
          let changebal = parseFloat(docs.balance) + parseFloat(req.body.amount);
          Accounts.updateOne({accNum: req.body.tgtAcc},
            {balance: changebal}, function(err,udocs) {
              if(err) {
                console.log(err);
              }else {
                console.log("Updated Balance: ", udocs )
              }
            });
            console.log("add",docs.balance,changebal);
          console.log(parseFloat(docs.balance) + parseFloat(req.body.amount));
        }
      })
      //Added this transaction to transaction schema
   
        const transaction= new Transactions({
          srcAcc: req.body.srcAcc,
          amount: req.body.amount,
          tgtAcc: req.body.tgtAcc,
          transactionType: req.body.transactionType,
          recurringFlag: req.body.recurringFlag 
        })

      try{
        const newTransaction=  transaction.save()
        res.status(201).json(newTransaction)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
      if(req.body.recurringFlag === true){
        if (req.body.recurFreq === null || req.body.recurFreq === "" || req.body.recurDate === null || req.body.recurDate === "") {
          return res.status(404).send({
          message: "Recurring data missing "
      })
      }
      if (req.body.recurDate === 0 || req.body.recurDate > 31) {
        return res.status(404).send({
          message: "Incorrect recurring date "
      })
    }
    }
      else {
        const recurring= new Recurring({
          recurSrcAcc: req.body.recurSrcAcc,
          recurAmt: req.body.recurAmt,
          recurTgtAcc: req.body.recurTgtAcc,
          recurDate: req.body.recurDate,
          recurFreq: req.body.recurFreq 
        })
        try{
          const newRecurring = recurring.save()
          return res.status(201).send({
            message: "Transaction completed successfully! "
        })
          
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      }
    } 
    //res.send("The transaction was saved")
})
    


//Updating one
//router.patch('/:id', (req,res) =>{
//})
//Deleting one
//router.delete('/:id', (req,res) =>{
//})

router.delete('/:id', getTransaction, async (req, res) => {
    try{
        await res.transaction.remove()
        res.json({ message: 'Deleted Transaction' })
    }catch (err) {
        res.status(500).json({ message: err.message })
      }
})
async function getTransaction(req, res, next) {
    let transaction
    try {
        transaction = await Transactions.findById(req.params.id)
      if (transaction == null) {
        return res.status(404).json({ message: 'Cannot find transaction' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.transaction = transaction
    next()
  }
    

module.exports = router

