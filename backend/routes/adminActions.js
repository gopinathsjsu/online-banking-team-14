const express = require('express')
const router = express.Router()
const Transactions = require('../models/transactions')
const Admins = require('../models/admin')
const Customers = require('../models/customers')
const Accounts = require('../models/accounts')

// adding a user

router.post('/', async (req, res) => {
  console.log("hi")

  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
    const customers = new Customers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const newCustomer= await customers.save()
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
      }
    
    //res.send("The customer was added")
})


/*router.delete('/:email', function(req, res, next) {
  Customers.findByIdAndRemove(req.params.email, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

// Getting all
router.get('/openAccount', async (req, res) => {
    const customers = await Accounts.find({})
    res.send(customers)
})
//=========================
//Opening an account
router.post('/openAccount', async (req, res) => {
  try {
      const { accNum, email, firstName, accountType,balance,userType} = req.body;
    
      if (!accNum|| !email || !firstName || !accountType || !balance)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      const existingAccNum = await Accounts.findOne({accNum})
  
      if (existingAccNum)
        return res.status(400).json({
          errorMessage: " account number already exists.",
        });
  
      /*if (accountType !== 'checking' || accountType !== 'savings')
        return res.status(400).json({
          errorMessage: " Account type Invalid.",
        });
  */
      const newAccount = new Accounts({
          accNum,
          email, 
          firstName,
          accountType,
          balance,
          userType
      }) ;
  
      const saveAccount = await newAccount.save();
      res.status(201).json("account created");
  }catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });
//===================================================
// Closing an account 

router.delete('/closeAccount/:accNum', function(req, res) {
  
    console.log(req.params.accNum);
	let id = req.params.accNum;
	Accounts.remove({
		accNum: id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Account has been closed.');
  })
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




router.post('/deposit/:accNum/:amount', async (req,res,next) => {
  Accounts.findOne({accNum: req.params.accNum}, function (err, docs) {
    if(err){
      res.status(500).send(err);;
    }
    else{
      var changebal = parseFloat(docs.balance) + parseFloat(req.params.amount);
      Accounts.updateOne({accNum: req.params.accNum},
        {balance: changebal}, function(err,udocs) {
          if(err) {
            res.send(err);
          }
          else if (docs.accNum != req.params.accNum){
            return res.status(404).send({
              message: "Account not found "
          })
        }
          else {
           
            res.status(200).send("Deposit sucessful");
          }
        });
        //console.log(changebal);
      //console.log(parseFloat(docs.balance) + parseFloat(req.params.amount));
    }
  })
})

router.post('/withdraw/:accNum/:amount', async (req,res,next) => {
  Accounts.findOne({accNum: req.params.accNum}, function (err, docs) {
    if(err){
      res.send(err);
    }
    else if (docs.accNum != req.params.accNum){
      return res.status(404).send({
        message: "Account not found "
    })
  }
    else if (docs.balance<req.params.amount){
      return res.status(404).send({
        message: "Insufficient balance "
    })
  }
    else{
      var changebal = parseFloat(docs.balance) - parseFloat(req.params.amount);
      
      Accounts.updateOne({accNum: req.params.accNum},
        {balance: changebal}, function(err,udocs) {
          if(err) {
            res.send(err);
          }else {
            //res.status(200).send("Updated Balance: ", udocs );
            res.status(200).send("Withdrawal sucessful");
          }
        });
        console.log(changebal);
      console.log(parseFloat(docs.balance) - parseFloat(req.params.amount));
    }
  })
})


module.exports = router;
